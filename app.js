const port = 3456
const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
const express = require('express')
const multer = require('multer')
const jpeg = require('jpeg-js')
const png = require('@vivaxy/png')

const tf = require('@tensorflow/tfjs')
const nsfw = require('nsfwjs')

const app = express()
const upload = multer()
const log4jsConfig = require('./config/log4js')

log4js.configure(log4jsConfig)
const logger = log4js.getLogger();
var errLogger = log4js.getLogger('err');

let _model

const convert = async (img, type) => {
    // Decoded image in UInt8 Byte array
    let image
    if (type === 0) {
        image = png.decode(img);

    } else if (type === 1) {
        image = await jpeg.decode(img, true)
    }
    const numChannels = 3
    const numPixels = image.width * image.height
    const values = new Int32Array(numPixels * numChannels)

    for (let i = 0; i < numPixels; i++)
        for (let c = 0; c < numChannels; ++c)
            values[i * numChannels + c] = image.data[i * 4 + c]

    return tf.tensor3d(values, [image.height, image.width, numChannels], 'int32')
}

/* 默认接口 */
app.get('/', (req, res) => {
    res.send({ code: 200, msg: 'hello' })
})

const fn = async (req, res) => {
    // 作者能力有限,仅支持png与jpg
    const imgType = ['image/png', 'image/jpeg'].indexOf(req.file.mimetype)
    if (imgType === -1) {
        res.send({
            neutral: 1,//中性
            drawing: 0,//绘画
            sexy: 0,//性感
            porn: 0,//色情
            hentai: 0//变态?
        })
        return
    }
    if (!req.file) res.status(400).send('Missing image multipart/form-data')
    else {
        try {
            const image = await convert(req.file.buffer, imgType)
            const predictions = await _model.classify(image)
            image.dispose()
            res.json(formatOutputData(predictions))
            toWriteLogs('info', formatOutputData(predictions))
        } catch (error) {
            res.send({ code: 500, msg: '服务器错误' })
            toWriteLogs('error', error)
        }

    }
}
/* 检查图片 */
app.post('/check', upload.single('image'), fn)
app.post('/image', upload.single('image'), fn)


const formatOutputData = (predictions, outVal = {}) => {
    predictions.forEach(item => {
        outVal[Object.values(item)[0].toLowerCase()] = Object.values(item)[1]
    })
    return outVal
}

const toWriteLogs = (type, data) => {
    if (type === 'info') {
        return logger.info(data)
    } else {
        return errLogger.error(data)
    }
}

const load_model = async () => {
    _model = await nsfw.load()
}

load_model().then(() => {
    app.listen(port, () => {
        console.log(`项目已运行在端口 ${port}`)
    })
})
    .catch(err => {
        toWriteLogs('error', err)
    })
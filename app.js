const port = 3456
const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
const express = require('express')
const multer = require('multer')
const jpeg = require('jpeg-js')

// var PNG = require('png-js');


const tf = require('@tensorflow/tfjs')
const nsfw = require('nsfwjs')

const app = express()
const upload = multer()
const log4jsConfig = require('./config/log4js')

log4js.configure(log4jsConfig)
const logger = log4js.getLogger();
var errLogger = log4js.getLogger('err');

let _model

const convert = async (img) => {
    // Decoded image in UInt8 Byte array
// var myimage = new PNG(img);
// let a = await myimage.decode()
// console.log(a);

    const image = await jpeg.decode(img, true)
    const numChannels = 3
    const numPixels = image.width * image.height
    const values = new Int32Array(numPixels * numChannels)

    for (let i = 0; i < numPixels; i++)
        for (let c = 0; c < numChannels; ++c)
            values[i * numChannels + c] = image.data[i * 4 + c]

    return tf.tensor3d(values, [image.height, image.width, numChannels], 'int32')
}

app.get('/', (req, res) => {
    res.send({ msg: 'hello' })
})

app.post('/image', upload.single('image'), async (req, res) => {
    // console.log(req.file.mimetype);
    // image/png
    if (!req.file) res.status(400).send('Missing image multipart/form-data')
    else {
        try {
            const image = await convert(req.file.buffer)
            const predictions = await _model.classify(image)
            image.dispose()
            res.json(formatOutputData(predictions))
            toWriteLogs('info', formatOutputData(predictions))
        } catch (error) {
            res.send({ code: 500 })
            toWriteLogs('error', error)
        }

    }
})

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


// curl --request POST localhost:8080/nsfw --header 'Content-Type: multipart/form-data' --data-binary 'image=@/full/path/to/picture.jpg'
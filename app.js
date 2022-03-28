const port = 3456
const fs = require("fs");
const path = require("path");

const express = require('express')
const multer = require('multer')
const jpeg = require('jpeg-js')

const tf = require('@tensorflow/tfjs')
const nsfw = require('nsfwjs')

const app = express()
const upload = multer()

let _model

const convert = async (img) => {
    // Decoded image in UInt8 Byte array
    const image = await jpeg.decode(img, true)
console.log(image);
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
    if (!req.file) res.status(400).send('Missing image multipart/form-data')
    else {
        const image = await convert(req.file.buffer)
        const predictions = await _model.classify(image)
        image.dispose()
        res.json(predictions)
        fs.appendFile('error.txt', JSON.stringify(predictions), function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }
})

const load_model = async () => {
    _model = await nsfw.load()
}

// Keep the model in memory, make sure it's loaded only once
load_model().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})
    .catch(err => {
        err = typeof err == 'string' ? err : JSON.stringify(err)
        fs.appendFile('error.txt', err, function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })


// curl --request POST localhost:8080/nsfw --header 'Content-Type: multipart/form-data' --data-binary 'image=@/full/path/to/picture.jpg'
const express = require('express')
const router = express.Router();
const multer = require('multer')

const upload = multer()

const {fn} = require('../utils/util')


/* 检查图片 */
router.post('/check', upload.single('image'), fn)
router.post('/image', upload.single('image'), fn)

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '接口文档' });
});

router.get('/demo', function(req, res, next) {
  res.send({
    neutral: 0.998292863368988,
    drawing: 0.0016498661134392023,
    sexy: 0.00005419895751401782,
    porn: 0.0000016388736412409344,
    hentai: 0.0000014019005902810022
  });
});

module.exports = router;

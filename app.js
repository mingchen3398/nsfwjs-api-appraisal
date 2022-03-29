const port = 3456
const path = require("path");
const express = require('express')
const app = express()
const indexRouter = require('./routes/index');
const checkRouter = require('./routes/check');

/* 允许跨域 */
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/* 默认接口 */
app.use('/', indexRouter);
app.use('/', checkRouter);
app.use(function (req, res) {
    res.render('404', { path: req.url });
})

app.listen(port, () => {
    console.log(`项目已运行在端口 ${port}`)
})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//mongodb 数据库导入
var mongoose = require('mongoose');
var session = require('express-session')
var cookieSession = require('cookie-session')
//日志中间件
var logger = require('morgan');


//数据路由
var indexRouter = require('./routes/index');

var app = express();
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

/**
 * 设置 session
 */
app.use(session({
    secret: 'cary',
    proxy : true,
    resave:false,//添加这行
    saveUninitialized: true,//添加这行
    cookie : {
        maxAge : 1000 * 60 * 2, // 设置 session 的有效时间，单位毫秒  1000 * 60 * 2
    },
}));

/**
 * 设置服务器可以跨域访问
 */
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') { res.send(200); /让options请求快速返回/
    } else {
        next();
    }
});

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    console.log(res.locals)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

mongoose.connect('mongodb://localhost/h5edit');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '数据库连接错误'));
db.once('open', function() {
    // we're connected!
    console.log('数据库连接成功')
});

module.exports = app;

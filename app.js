import express from 'express'
import bodyParser from 'body-parser'
import domainMiddleware from 'express-domain-middleware'
import path from 'path'
import swig from 'swig'
import log4js from 'log4js'
import http from 'http'
import errorHandler from 'errorhandler'
import cookieParser from 'cookie-parser'
import ConnectMongo from 'connect-mongo'
import webpack from 'webpack'

import indexRoute from './routes/index'

let app = express();

// 前端文件目录
app.use(express.static(__dirname + '/public'));

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler());

// 模板引擎
// ===============
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

// Webpack中间件
// ===============
// let webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
// let compiler = webpack(webpackConfig);
//
// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true, publicPath: webpackConfig.output.publicPath
// }));
//
// app.use(require('webpack-hot-middleware')(compiler, {
//   log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
// }));

// log4j配置
// ===============
log4js.configure({
  appenders: [
    { type: 'console' }       //控制台输出
    // {
    //   type: 'file',        //文件输出
    //   filename: 'logs/log.log',
    //   maxLogSize: 1024,
    //   backups:3,
    //   category: 'normal'
    // }
  ]
});

let logger = log4js.getLogger('normal');

// logger.setLevel('INFO');
logger.setLevel('DEBUG');

// process.on('uncaughtException', function (err) {
//   console.log(err);
// });

// 路由配置
// ===============
app.use('/', indexRoute);

// 异常处理
// ===============

// Catch 404
app.use(function(req, res, next) {
    let err = new Error('Not Found, url:' + req.originalUrl);
    err.status = 404;
    next(err);
});

// log error
app.use(function(err, req, res, next) {
    let logMsg = err.stack || err;
    if (err.status && err.status === 404) {
        logger.warn(logMsg);
    } else {
        logger.fatal(logMsg);
    }
    next(err);
});

// render error
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        status: err.status,
    });
});

// 启动服务
// ===============
let server = app.listen(8888, function () {
    const host = server.address().address;
    const port = server.address().port;
    logger.info('Young app listening at http://%s:%s', host, port);
});

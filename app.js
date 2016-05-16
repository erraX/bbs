import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import swig from 'swig'
import log4js from 'log4js'
import http from 'http'
import errorHandler from 'errorhandler'
import ConnectMongo from 'connect-mongo'
import compression from 'compression'
import ReqLogger from './middlewares/ReqLogger'

import indexRoute from './routes/index'

let app = express();

// gzip压缩
app.use(compression());
// 前端文件目录
app.use(express.static(__dirname + '/public'));
// 中间件
app.use(ReqLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler());

// 模板引擎
// ===============
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

// extend swig filter
swig.setFilter('range', (x) => Array.apply(null, Array(x - 1)).map((_, i) => i + 1));

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

const logger = log4js.getLogger('normal');

// logger.setLevel('INFO');
logger.setLevel('DEBUG');

process.on('uncaughtException', function (err) {
  logger.error(err);
});

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

import log4js from 'log4js'

const logger = log4js.getLogger('normal');

/**
 * 中间件，打印出请求的方法和地址
 *
 */
export default function(req, res, next) {
    logger.info(req.method, req.originalUrl, req.query, req.params);
    next();
}

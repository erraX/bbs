import log4js from 'log4js'
import express from 'express'
import manager from '../modules/manager'
import m from 'moment'

const logger = log4js.getLogger('normal');

let index = express.Router();

index.get('/', async (req, res, next) => {
    logger.info('Get index');
    let data;
    try {
        data = await manager.getTopicList();
    } catch (e) {
        next(e);
    }

    res.render('list', {topics: data});
});

index.get('/topic/:tid', async (req, res, next) => {
    let data;
    let title;
    let tid = req.params.tid
    logger.info('Get detail', tid);
    try {
        data = await manager.getTopicDetailById(tid, 'asc');
        title = await manager.getTitleById(tid);
    } catch (e) {
        next(e);
    }

    res.render('detail', {
        content: data,
        title: title,
    });
});

export default index;

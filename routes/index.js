import log4js from 'log4js'
import express from 'express'
import manager from '../modules/manager'
import m from 'moment'

const logger = log4js.getLogger('normal');

let index = express.Router();

index.get('/', async (req, res, next) => {
    let topics;
    let totalPage;
    let pageNo = req.query.pageno || 1;

    try {
        topics = await manager.getTopicList('desc', parseInt(pageNo, 10));
        totalPage = await manager.getTopicTotalPageNum();
    } catch (e) {
        next(e);
    }

    res.render('list', {
        topics,
        totalPage,
        pageNo,
    });
});

index.get('/topic/:tid', async (req, res, next) => {
    let content;
    let title;
    let totalPage;
    let tid = req.params.tid
    let pageNo = req.query.pageno || 1;

    try {
        content = await manager.getTopicDetailById(tid, 'asc', parseInt(pageNo, 10));
        title = await manager.getTitleById(tid);
        totalPage = await manager.getDetailTotalPageNum(tid);
    } catch (e) {
        next(e);
    }

    res.render('detail', {
        content,
        title,
        totalPage,
        pageNo,
    });
});

export default index;

import express from 'express'
import manager from '../modules/manager'
import m from 'moment'

let index = express.Router();

index.get('/', async (req, res, next) => {
    let data;
    try {
        data = await manager.getTopicList();
    } catch (e) {
        next(e);
    }

    res.render('list', {topics: data});
});

index.get('/topic/:tid', async (req, res, next) => {
    let tid = req.params.tid
    let data;
    try {
        data = await manager.getTopicDetailById(tid, 'asc');
    } catch (e) {
        next(e);
    }

    res.render('detail', {content: data});
});

export default index;

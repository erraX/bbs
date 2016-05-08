import express from 'express'
import manager from '../modules/manager'
import m from 'moment'

let index = express.Router();

index.get('/', async (req, res, next) => {
    throw new Error('errrrror');
    let data = await manager.getTopicList();
    res.render('list', {topics: data});
});

index.get('/topic/:tid', async (req, res, next) => {
    let tid = req.params.tid
    let data = await manager.getTopicDetailById(tid, 'asc');

    res.render('detail', {content: data});
});

export default index;

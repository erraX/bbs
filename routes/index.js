import express from 'express'
import manager from '../modules/manager'
import m from 'moment'

let index = express.Router();

index.get('/', async (req, res, next) => {
    let data = await manager.getTopicList();

    for (let key in data) {
        let time = data[key].lastUpdateTime;
        data[key].lastUpdateTime = time.toISOString();
        // console.log(time.toISOString());
        // data[key].time = time.toISOString();
        // let time2 = Date.parse(time) / 1000;
        // console.log(data[key].id, data[key].lastUpdateTime);
        // data[key].lastUpdateTime = m.unix(time2).format('YYYY-MM-DD HH:MM');
        // data[key].lastUpdateTime = m(time.toISOString()).format('YYYY-MM-DD HH:MM');
        // console.log(data[key].lastUpdateTime);
    }

    res.render('list', {topics: data});
});

index.get('/topic/:tid', async (req, res, next) => {
    let tid = req.params.tid
    let data = await manager.getTopicDetailById(tid, 'asc');

    res.render('detail', {content: data});
});

export default index;

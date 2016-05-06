import log4js from 'log4js'
import MongoPool from './mongo-pool'
import Q from 'q'

async function searchData(colName, schema, order, page) {
    console.log(colName, schema, order, page)
    let dfd = Q.defer();
    let db = await MongoPool.getInstance();

    db.collection(colName)
        .find(schema)
        .sort(order)
        .skip(page.pageNo > 0 ? ((page.pageNo - 1) * page.pageSize) : 0)
        .limit(page.pageSize)
        .toArray((e, o) => {
            if (e) {
                dfd.reject('error');
            } else {
                dfd.resolve(o);
            }
        });

    return dfd.promise;
}

export default {
    async getTopicDetailById(id, orderBy = 'desc', pageNo = 1, pageSize = 1000) {
        let data = await searchData(
            'detail',
            { id: id },
            { floor: orderBy === 'desc' ? -1 : 1 },
            { pageNo, pageSize, }
        );

        return data;
    },

    async getTopicList(orderBy = 'desc', pageNo = 1, pageSize = 1000) {
        let data = await searchData(
            'topic',
            {},
            { lastUpdateTime: orderBy === 'desc' ? -1 : 1 },
            { pageNo, pageSize, }
        );

        return data;
    },
}

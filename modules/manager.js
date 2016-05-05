import log4js from 'log4js'
import MongoPool from './mongo-pool'

export default {
    getTopicDetailById(id, orderBy = 'desc', pageNo = 1, pageSize = 20) {
        let dfd = Q.defer();
        let db = await MongoPool.getInstance();

        db.collection('detail').find({ id: id })
            .toArray((e, o) => {
                if (e) {
                    dfd.reject('error');
                } else {
                    dfd.resolve(o);
                }
            });

        return dfd.promise;
    },

    getTopicList(orderBy = 'desc', pageNo = 1, pageSize = 20) {
        let dfd = Q.defer();
        let db = await MongoPool.getInstance();
    },
}

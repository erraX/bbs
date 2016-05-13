import log4js from 'log4js'
import MongoPool from './mongo-pool'
import Q from 'q'
import timeConverter from './TimeConverter'
import _ from 'lodash'

const logger = log4js.getLogger('normal');
const slice = Array.prototype.slice;
const DEAULT_PAGE_SIZE = 40;

async function fetchList(colName, schema, order, page) {
    let db;
    let dfd = Q.defer();

    try {
        db = await MongoPool.getInstance();
    } catch (e) {
        dfd.reject('db-error')
    }

    db.collection(colName)
        .find(schema)
        .sort(order)
        .skip(page.pageNo > 0 ? ((page.pageNo - 1) * page.pageSize) : 0)
        .limit(page.pageSize)
        .toArray((e, o) => {
            if (e) {
                dfd.reject('collection-error');
            } else {
                dfd.resolve(o);
            }
        });

    return dfd.promise;
}

async function fetchPage(colName, schema, pageSize) {
    let db;
    let dfd = Q.defer()

    try {
        db = await MongoPool.getInstance();
    } catch (e) {
        dfd.reject('db-error')
    }

    db.collection(colName)
        .find(schema)
        .toArray((e, o) => {
            if (e) {
                dfd.reject('collection-error');
            } else {
                // logger.debug(`Total: ${o.length}, TotalPage: ${Math.ceil(o.length / pageSize)}, Pagesize: ${pageSize}`);
                dfd.resolve(Math.ceil(o.length / pageSize));
            }
        });

    return dfd.promise;
}

function convert(data, processor) {
    let args = slice.call(arguments, 2);
    _.each(data, (v, k) => timeConverter.apply(this, _.concat(v, args)));
    return data;
}

export default {
    async getTopicTotalPageNum(pageSize = DEAULT_PAGE_SIZE) {
        let totalPage = await fetchPage('topic', {}, pageSize);
        return totalPage
    },

    async getDetailTotalPageNum(id, pageSize = DEAULT_PAGE_SIZE) {
        let totalPage = await fetchPage('detail', {id}, pageSize);
        return totalPage
    },

    async getTopicDetailById(id, orderBy = 'desc', pageNo = 1, pageSize = DEAULT_PAGE_SIZE) {
        let data = await fetchList(
            'detail',
            { id: id },
            { floor: orderBy === 'desc' ? -1 : 1 },
            { pageNo, pageSize, }
        );

        convert(data, timeConverter, 'postedTime');

        return data;
    },

    async getTopicList(orderBy = 'desc', pageNo = 1, pageSize = DEAULT_PAGE_SIZE) {
        let data = await fetchList(
            'topic',
            {},
            { lastUpdateTime: orderBy === 'desc' ? -1 : 1 },
            { pageNo, pageSize, }
        );
        convert(data, timeConverter, 'lastUpdateTime');

        return data;
    },

    async getTitleById(id) {
        let db;
        let dfd = Q.defer();

        try {
            db = await MongoPool.getInstance();
        } catch (e) {
            dfd.reject('db-error')
        }

        db.collection('topic')
            .findOne({id: id}, (e, o) => {
                if (e) {
                    dfd.reject('error');
                } else {
                    dfd.resolve(o.topic);
                }
            });

        return dfd.promise;
    },
}

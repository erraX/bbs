import {MongoClient} from 'MongoClient'

const URL = 'mongodb://localhost:27017/node-login';

const option = {
    db: {
        numberOfRetries : 5
    },
    server: {
        auto_reconnect: true,
        poolSize : 40,
        socketOptions: {
            connectTimeoutMS: 500
        }
    },
    replSet: {},
    mongos: {}
};

let p_db;

let MongoPool = {
    initPool(cb) {
        MongoClient.connect(URL, option, function(err, db) {
            if (err) {
                throw err;
            }
            p_db = db;
            if(cb && typeof(cb) == 'function')
                cb(p_db);
        });
        return MongoPool;
    },

    getInstance(cb) {
        if(!p_db){
            MongoPool.initPool(cb)
        }
        else{
            if(cb && typeof(cb) == 'function')
                cb(p_db);
        }
    }
};

export default MongoPool

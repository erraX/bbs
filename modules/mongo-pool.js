import {MongoClient} from 'mongodb'
import Q from 'q'

const URL = 'mongodb://127.0.0.1:27017/erji';

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
    initPool() {
        let dfd = Q.defer();
        MongoClient.connect(URL, option, (err, db) => {
            if (err) {
                throw err;
            }
            p_db = db;
            dfd.resolve(p_db);
        });
        return dfd.promise;
    },

    getInstance() {
        let dfd = Q.defer();
        if(!p_db){
            return MongoPool.initPool();
        }
        else{
            dfd.resolve(p_db);
        }
        return dfd.promise;
    }
};

export default MongoPool

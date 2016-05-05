import Mongodb from 'mongodb'
import MongoPool from './mongo-pool'

export default {
    getObjectId(id) {
        return new Mongodb.ObjectID(id);
    },

    convertId(o) {
        for (let key in o) {
            o[key]['_id'] = this.getObjectId(o[key]['_id']) + '';
        }
        return o;
    },

    inList(id, list) {
        for (let i = 0; i < list.length; i++) {
            if (id == this.getObjectId(list[i]._id)) {
                return true;
            }
        }
        return false;
    }
};

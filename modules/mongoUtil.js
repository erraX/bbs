module.exports = {
    getObjectId: function(id) {
        return new require('mongodb').ObjectID(id);
    },

    convertId: function(o) {
        for (var key in o) {
            o[key]['_id'] = this.getObjectId(o[key]['_id']) + '';
        }
        return o;
    },

    inList: function(id, list) {
        for (var i = 0; i < list.length; i++) {
            if (id == this.getObjectId(list[i]._id)) {
                return true;
            }
        }
        return false;
    }
};

var logger = require('log4js').getLogger('normal');
var util = require('../util');

var manager = {};

var use = function(target, props) {
    for(var prop in props) {
        if(props.hasOwnProperty(prop)) {
            target[prop] = props[prop];
        }
    }
};

// 账号管理
use(manager, require('./accountManager')('accounts'));
// 权限管理
use(manager, require('./roleManager')('roles'));
// 活动管理
use(manager, require('./activityManager')('activity'));
// 社团管理
use(manager, require('./associationManager')('association'));

module.exports = manager;

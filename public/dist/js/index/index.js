define(['./init'], function (_init) {
    'use strict';

    var _init2 = _interopRequireDefault(_init);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // DOM Ready
    $(function () {
        _init2.default.start();
    });
});

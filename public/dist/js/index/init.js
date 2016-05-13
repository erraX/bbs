define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        start: function start(options) {
            this.initStructure();
            this.initEvents();
        },
        initStructure: function initStructure() {
            console.log('initStructure');
        },
        initEvents: function initEvents() {
            console.log('initEvents');
        }
    };
});
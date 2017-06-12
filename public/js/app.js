(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _processData = require("./modules/processData");

var _processData2 = _interopRequireDefault(_processData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jira = {
    getUpdates: new WebSocket("ws://localhost:3300/socketserver", "protocolOne"),
    data: {}

    /**
     * Establish connection
     */
};jira.getUpdates.onopen = function (event) {
    console.log("Connected to http://localhost:3300/");
    jira.getUpdates.send('Test');
};

/**
 * Update info
 */
jira.getUpdates.onmessage = function (event) {
    (0, _processData2.default)(jira, JSON.parse(event.data));
    console.log(jira);
};

},{"./modules/processData":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj, data) {
    // obj.dataplate = [{
    //     assignees: [
    //         null
    //     ],
    //     blocked: 0,
    //     closed: 0,
    //     devComplete: 0,
    //     devTest: 0,
    //     inProgress: 0,
    //     name: null,
    //     opened: 0,
    //     project: null,
    //     readyForTest: 0,
    //     tridion: 0,
    // }];

    console.log(data);

    //check if data is an array
    if (!Array.isArray(data)) {
        console.log(data.message || data);
        return;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            console.log(item);
            obj.data[item.project] = item;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log(obj);
};

},{}]},{},[1])

//# sourceMappingURL=app.js.map

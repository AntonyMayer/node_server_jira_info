(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _processData = require("./modules/processData");

var _processData2 = _interopRequireDefault(_processData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUpdates = new WebSocket("ws://localhost:3300/socketserver", "protocolOne");

getUpdates.onopen = function (event) {
    console.log("Connected to http://localhost:3300/");
    getUpdates.send('Test');
};

getUpdates.onmessage = function (event) {
    (0, _processData2.default)(event.data);
};

},{"./modules/processData":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data) {
    try {
        var dataParsed = JSON.parse(data);
        console.log(dataParsed);
    } catch (e) {
        console.log(data);
    }
};

},{}]},{},[1])

//# sourceMappingURL=app.js.map

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var getUpdates = new WebSocket("ws://localhost:3300/socketserver", "protocolOne"),
    stamp = Date.now(),
    processData = require('./modules/processData');

getUpdates.onopen = function (event) {
    getUpdates.send(stamp);
    console.log(`Message__${stamp} send to server`);
};

getUpdates.onmessage = function (event) {
    console.log(event.data);
    processData(event.data);
};

},{"./modules/processData":2}],2:[function(require,module,exports){
module.exports = data => {
    try {
        let dataParsed = JSON.parse(data);
        console.log(dataParsed);
    } catch (e) {
        console.log(data);
    }
};

},{}]},{},[1])

//# sourceMappingURL=app.js.map

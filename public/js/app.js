(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _processData = require('./modules/processData');

var _processData2 = _interopRequireDefault(_processData);

var _buildTable = require('./modules/buildTable');

var _buildTable2 = _interopRequireDefault(_buildTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//namespace object
var jira = {
    getUpdates: new WebSocket("ws://localhost:3300/socketserver", "protocolOne"),
    data: {}

    /**
     * Establish connection
     */
};jira.getUpdates.onopen = function (event) {
    console.log('Connected to http://localhost:3300/');
    jira.getUpdates.send('Test');
};

/**
 * Update info
 */
jira.getUpdates.onmessage = function (event) {
    (0, _processData2.default)(jira, JSON.parse(event.data));
    (0, _buildTable2.default)(jira.data, 'projects');
    (0, _buildTable2.default)(jira.data, 'devs');
};

},{"./modules/buildTable":2,"./modules/processData":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data, type) {

    //check if object is not empty
    if (noData(data)) return;

    //create table and rows, find container
    var table = createNode('table'),
        rows = createRows(data),
        container = document.getElementById("current_projects"),
        headers = ['Project', 'Key', '(Re)Open', 'In Progress', 'Dev Complete', 'Tridion Pbl', 'QA Test', 'Blocked', 'Closed', 'Assignees'];

    createTable(container, table, headers, rows);
};

/**
 * Check if data is a proper object
 * 
 * @param {object} data object to check 
 * @returns {boolean} 
 */
function noData(data) {
    console.log(data);
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        console.log('No data to display');
        return true;
    }
    return false;
}

/**
 * Elements factory
 * 
 * @param {string} type indicate element type
 * @param {string} content set textContent for element
 * @returns {object} html node
 */
function createNode(type, content) {
    var node = document.createElement(type);
    type === "table" ? node.className = "b_table" : node.className = 'b_table__' + type;
    if (content || content === 0) node.textContent = content;
    return node;
}

/**
 * Creaet rows from data
 * 
 * @param {object} data object containing data on current projects
 * @returns {array} with html nodes
 */
function createRows(data) {
    var rows = [];
    for (var row in data) {
        var tr = createNode('tr');
        rows.push(createCell(tr, data[row]));
    }
    return rows;
}

function createCell(tr, data) {
    //destructuring object with project data & assigning default values
    var _data$assignees = data.assignees,
        assignees = _data$assignees === undefined ? [null] : _data$assignees,
        _data$blocked = data.blocked,
        blocked = _data$blocked === undefined ? 0 : _data$blocked,
        _data$closed = data.closed,
        closed = _data$closed === undefined ? 0 : _data$closed,
        _data$devComplete = data.devComplete,
        devComplete = _data$devComplete === undefined ? 0 : _data$devComplete,
        _data$devTest = data.devTest,
        devTest = _data$devTest === undefined ? 0 : _data$devTest,
        _data$inProgress = data.inProgress,
        inProgress = _data$inProgress === undefined ? 0 : _data$inProgress,
        _data$name = data.name,
        name = _data$name === undefined ? "Classified" : _data$name,
        _data$opened = data.opened,
        opened = _data$opened === undefined ? 0 : _data$opened,
        _data$project = data.project,
        project = _data$project === undefined ? "Top Secret" : _data$project,
        _data$readyForTest = data.readyForTest,
        readyForTest = _data$readyForTest === undefined ? 0 : _data$readyForTest,
        _data$tridion = data.tridion,
        tridion = _data$tridion === undefined ? 0 : _data$tridion;

    //building an array for cells in a proper order

    var cells = [name, project, opened, inProgress, devComplete, tridion, readyForTest, blocked, closed, assignees];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cell = _step.value;

            var td = createNode('td', cell);
            tr.appendChild(td);
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

    return tr;
}

/**
 * Build a table
 * 
 * @param {object} container table's container
 * @param {object} table html node object
 * @param {array} headers array with headers' values
 * @param {array} rows array with html nodes to be used as rows
 * @returns {void} 
 */
function createTable(container, table, headers, rows) {

    //create headers
    var tr = createNode('tr');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = headers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var cell = _step2.value;

            var td = createNode('td', cell);
            tr.appendChild(td);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    table.appendChild(tr);

    // table.appendChild(headers);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = rows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var row = _step3.value;

            table.appendChild(row);
        }

        //append table to its container
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    container.appendChild(table);
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (jira, data) {

    //check if data contains message
    if (data.message) {
        console.log(data.message);
        return;
    }

    //update jira.data object
    for (var item in data) {
        jira.data[item] = data[item];
    }
    console.log(jira.data);
};

},{}]},{},[1])

//# sourceMappingURL=app.js.map

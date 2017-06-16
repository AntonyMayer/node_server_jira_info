(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _processData = require('./modules/processData');

var _processData2 = _interopRequireDefault(_processData);

var _time = require('./modules/time');

var _time2 = _interopRequireDefault(_time);

var _tables = require('./modules/tables');

var _tables2 = _interopRequireDefault(_tables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Namespace object
 */
var jira = {
    webSocket: new WebSocket("ws://10.89.236.210:7700/socketserver"),
    data: {
        projects: {}, //data for currently tracked projects
        devs: {} //data for tickets by developers
    },
    widgets: {
        time: {
            container: "widget_time",
            class: "b_time"
        },
        tables: {
            container: "widget_projects",
            class: "b_table"
        }
    }

    /**
     * Establish connection
     */
};jira.webSocket.onopen = function (event) {
    console.log('Browser >> Connected to http://10.89.236.210/');
    jira.webSocket.send('Test');
};

/**
 * Update info
 */
jira.webSocket.onmessage = function (event) {
    (0, _processData2.default)(jira, JSON.parse(event.data));
    (0, _time2.default)(jira);
    tablesWidgetUpdate();
};

/**
 * Tables update
 */
function tablesWidgetUpdate() {
    document.getElementById(jira.widgets.tables.container).textContent = '';
    (0, _tables2.default)(jira, 'projects');
    (0, _tables2.default)(jira, 'devs');
}

},{"./modules/processData":2,"./modules/tables":3,"./modules/time":4}],2:[function(require,module,exports){
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
    console.log(new Date());
    console.log(jira.data);
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var jira = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "projects";


    //check if data object is not empty
    if (noData(jira.data[type])) return;

    //create table, headers, rows, select container
    var container = document.getElementById(jira.widgets.tables.container),
        table = createNode('table'),
        headers = createHeaders(jira.data[type], type),
        rows = createRows(jira.data[type], type, headers);

    createTable(container, type, table, headers, rows);
};

/**
 * Create headers for table based on type
 * 
 * @param {object} data object containing data on current projects
 * @param {string} type table type => "projects" || "devs"
 * @returns {object} array with headers' names
 */
function createHeaders(data, type) {
    var headers = [];
    if (type === "projects") {
        headers = ['Project', 'Jira Key', '(Re)Open', 'In Progress', 'Dev Complete', 'Tridion Pbl', 'QA Test', 'Blocked', 'Closed', 'Assignees'];
    } else {
        headers = ['Developer'];
        for (var dev in data) {
            for (var project in data[dev]) {
                if (!headers.includes(project)) headers.push(project);
            }
        }
    }
    return headers;
}

/**
 * Check if data is a proper object
 * 
 * @param {object} data object to check 
 * @returns {boolean} 
 */
/**
 * Module to build tables based on data type
 * 
 * @export tablesFactory function
 * @param {object} [jira={}] data to be used in table 
 * @param {string} [type="projects"]  table type => "projects" || "devs"
 * @returns {void}
 */
function noData(data) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        return true;
    }
    return false;
}

/**
 * Elements factory
 * 
 * @param {string} nodeType indicate element type
 * @param {string} content set textContent for element
 * @returns {object} html node
 */
function createNode(nodeType, content) {
    var node = document.createElement(nodeType);
    nodeType === "table" ? node.className = "b_table" : node.className = "b_table__" + nodeType;
    if (content || content === 0) node.textContent = content;
    return node;
}

/**
 * Creaet rows from data
 * 
 * @param {object} data object containing data on current projects
 * @param {string} type table type => "projects" || "devs"
 * @returns {array} with html nodes
 */
function createRows(data, type, headers) {
    var rows = [];
    for (var row in data) {
        var tr = createNode('tr');
        rows.push(createCell(tr, data[row], row, type, headers));
    }
    return rows;
}

function addClassModifier(node) {
    var classModifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '--active';

    classModifier = node.className + classModifier;
    node.classList.add(classModifier);
}

/**
 * Create cell beased on bunch of params...
 * 
 * @param {object} tr current tr html node
 * @param {object} data object containing data on current projects
 * @param {string} name name of the current row 
 * @param {string} type table type => "projects" || "devs"
 * @param {array} headers array with data for table headers
 * @returns {object} tr html node
 */
function createCell(tr, data, name, type, headers) {
    var cells = [];

    if (type === "projects") {
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
            _name = _data$name === undefined ? "Top Secret" : _data$name,
            _data$opened = data.opened,
            opened = _data$opened === undefined ? 0 : _data$opened,
            _data$project = data.project,
            project = _data$project === undefined ? "Classified" : _data$project,
            _data$readyForTest = data.readyForTest,
            readyForTest = _data$readyForTest === undefined ? 0 : _data$readyForTest,
            _data$tridion = data.tridion,
            tridion = _data$tridion === undefined ? 0 : _data$tridion;

        //building an array for cells in a proper order


        cells = [_name, project, opened, inProgress, devComplete, tridion, readyForTest, blocked, closed, assignees];
    } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _project2 = _step.value;
                cells.push(0);
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

        cells[0] = name; //set dev name as the first value in cells array
        for (var _project in data) {
            //assign dev's project value (num of tickets) to proper position in cells arr
            cells[headers.indexOf(_project)] = data[_project];
        }
    }

    for (var i = 0; i < cells.length; i++) {
        var td = createNode('td', cells[i]),
            _blocked = 7;

        //check for blocked column
        if (i === _blocked && cells[i] > 0) addClassModifier(td, '--red');

        tr.appendChild(td);
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
function createTable(container, type, table, headers, rows) {

    var tableTitle = createNode('h2', type);

    //create headers
    var tr = createNode('tr');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = headers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var cell = _step2.value;

            var td = createNode('th', cell);
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

    container.appendChild(tableTitle);
    container.appendChild(table);
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var jira = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var container = document.getElementById(jira.widgets.time.container),
        header = document.createElement('h2'),
        time = new Date(),
        hours = time.getHours() > 12 ? time.getHours() - 1 : time.getHours(),
        minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();

    container.textContent = '';
    header.className = jira.widgets.time.class;
    header.textContent = 'Last update: ' + hours + ' : ' + minutes;
    container.appendChild(header);
};

},{}]},{},[1])

//# sourceMappingURL=app.js.map

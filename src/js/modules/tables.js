/**
 * Module to build tables based on data type
 * 
 * @export tablesFactory function
 * @param {object} [jira={}] data to be used in table 
 * @param {string} [type="projects"]  table type => "projects" || "devs"
 * @returns {void}
 */
export default function(jira = {}, type = "projects") {

    //check if data object is not empty
    if (noData(jira.data[type])) return;

    //create table, headers, rows, select container
    let container = document.getElementById(jira.widgets.tables.container),
        table = createNode('table'),
        headers = createHeaders(jira.data[type], type),
        rows = createRows(jira.data[type], type, headers);

    createTable(container, type, table, headers, rows);
}

/**
 * Create headers for table based on type
 * 
 * @param {object} data object containing data on current projects
 * @param {string} type table type => "projects" || "devs"
 * @returns {object} array with headers' names
 */
function createHeaders(data, type) {
    let headers = [];
    if (type === "projects") {
        headers = [
            'Project',
            'Jira Key',
            '(Re)Open',
            'In Progress',
            'Dev Complete',
            'Tridion Pbl',
            'QA Test',
            'Blocked',
            'Closed',
            'Assignees'
        ];
    } else {
        headers = ['Developer'];
        for (let dev in data) {
            for (let project in data[dev]) {
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
    let node = document.createElement(nodeType);
    (nodeType === "table") ? node.className = "b_table": node.className = `b_table__${nodeType}`;
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
    let rows = [];
    for (let row in data) {
        let tr = createNode('tr');
        rows.push(createCell(tr, data[row], row, type, headers));
    }
    return rows;
}

function addClassModifier(node, classModifier = '--active') {
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
    let cells = [];

    if (type === "projects") {
        //destructuring object with project data & assigning default values
        let {
            assignees = [null],
                blocked = 0,
                closed = 0,
                devComplete = 0,
                devTest = 0,
                inProgress = 0,
                name = "Top Secret",
                opened = 0,
                project = "Classified",
                readyForTest = 0,
                tridion = 0
        } = data;

        //building an array for cells in a proper order
        cells = [name, project, opened, inProgress, devComplete, tridion, readyForTest, blocked, closed, assignees];

    } else {
        for (let project of headers) cells.push(0);
        cells[0] = name; //set dev name as the first value in cells array
        for (let project in data) {
            //assign dev's project value (num of tickets) to proper position in cells arr
            cells[headers.indexOf(project)] = data[project];
        }
    }

    for (let i = 0; i < cells.length; i++) {
        let td = createNode('td', cells[i]),
            blocked = 7;

        //check for blocked column
        if (i === blocked && cells[i] > 0) addClassModifier(td, '--red');

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

    let tableTitle = createNode('h2', type);

    //create headers
    let tr = createNode('tr');
    for (let cell of headers) {
        let td = createNode('th', cell);
        tr.appendChild(td);
    }
    table.appendChild(tr);

    // table.appendChild(headers);
    for (let row of rows) {
        table.appendChild(row);
    }

    //append table to its container
    container.appendChild(tableTitle);
    container.appendChild(table);
}
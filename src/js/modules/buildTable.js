/**
 * Module to build tables based on data type
 * 
 * @export tablesFactory function
 * @param {object} [data={}] data to be used in table 
 * @param {string} [type="projects"]  table type => "projects" || "devs"
 * @returns {void}
 */
export default function(data = {}, type = "projects") {

    //check if data object is not empty
    if (noData(data)) return;

    //config for table, headers, rows, container
    let container = document.getElementById("current_projects"),
        table = createNode('table'),
        headers = createHeaders(data, type),
        rows = createRows(data);

    createTable(container, table, headers, rows);
}

/**
 * Create headers for table based on type
 * 
 * @param {any} data object containing data on current projects
 * @param {any} type table type => "projects" || "devs"
 * @returns 
 */
function createHeaders(data, type) {
    let headers = [];
    if (type === "projects") {
        headers = [
            'Project', 
            'Key', 
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
        for (let dev in data) {
            for (let project in data[dev]) {
                if(!headers.includes(project)) headers.push(project);
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
    let node = document.createElement(type);
    (type === "table") ? node.className = "b_table": node.className = `b_table__${type}`;
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
    let rows = [];
    for (let row in data) {
        let tr = createNode('tr');
        rows.push(createCell(tr, data[row]));
    }
    return rows;
}

function createCell(tr, data) {
    //destructuring object with project data & assigning default values
    let {
        assignees = [null],
            blocked = 0,
            closed = 0,
            devComplete = 0,
            devTest = 0,
            inProgress = 0,
            name = "Classified",
            opened = 0,
            project = "Top Secret",
            readyForTest = 0,
            tridion = 0
    } = data;

    //building an array for cells in a proper order
    let cells = [name, project, opened, inProgress, devComplete, tridion, readyForTest, blocked, closed, assignees]

    for (let cell of cells) {
        let td = createNode('td', cell);
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
function createTable(container, table, headers, rows) {
       
    //create headers
    let tr = createNode('tr');
    for (let cell of headers) {
        let td = createNode('td', cell);
        tr.appendChild(td);
    }
    table.appendChild(tr);

    // table.appendChild(headers);
    for (let row of rows) {
        table.appendChild(row);
    }

    //append table to its container
    container.appendChild(table);
}
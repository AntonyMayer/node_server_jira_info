import processData from './modules/processData';
import buildTable from './modules/buildTable';

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
        tables: {
            contsinerID: "current_projects"
        }
    }
}

/**
 * Establish connection
 */
jira.webSocket.onopen = function(event) {
    console.log(`Browser >> Connected to http://10.89.236.210/`);
    jira.webSocket.send('Test');
};

/**
 * Update info
 */
jira.webSocket.onmessage = function(event) {
    processData(jira, JSON.parse(event.data));
    tablesWidgetUpdate();
}

/**
 * Tables update
 */
function tablesWidgetUpdate() {
    document.getElementById(jira.widgets.tables.contsinerID).textContent = '';
    buildTable(jira.data.projects, 'projects');
    buildTable(jira.data.devs, 'devs');
}
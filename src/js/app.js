import processData from './modules/processData';
import time from './modules/time';
import buildTable from './modules/tables';

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
    time(jira);
    tablesWidgetUpdate();
}

/**
 * Tables update
 */
function tablesWidgetUpdate() {
    document.getElementById(jira.widgets.tables.container).textContent = '';
    buildTable(jira, 'projects');
    buildTable(jira, 'devs');
}
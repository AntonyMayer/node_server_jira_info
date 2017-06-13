import processData from './modules/processData';
import buildTable from './modules/buildTable';

/**
 * Namespace object
 */
var jira = {
    getUpdates: new WebSocket("ws://localhost:7700/socketserver", "protocolOne"),
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
jira.getUpdates.onopen = function(event) {
    console.log(`Browser >> Connected to http://localhost:7700/`);
    jira.getUpdates.send('Test');
};

/**
 * Update info
 */
jira.getUpdates.onmessage = function(event) {
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
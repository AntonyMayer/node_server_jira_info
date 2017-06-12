import processData from './modules/processData';

var jira = {
    getUpdates: new WebSocket("ws://localhost:3300/socketserver", "protocolOne"),
    data: {}
}

/**
 * Establish connection
 */
jira.getUpdates.onopen = function(event) {
    console.log(`Connected to http://localhost:3300/`);
    jira.getUpdates.send('Test');
};

/**
 * Update info
 */
jira.getUpdates.onmessage = function(event) {
    processData(jira, JSON.parse(event.data));
    console.log(jira);
}
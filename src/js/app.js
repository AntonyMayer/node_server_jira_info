import processData from './modules/processData';

var getUpdates = new WebSocket("ws://localhost:3300/socketserver", "protocolOne");

/**
 * Establish connection
 */
getUpdates.onopen = function(event) {
    console.log(`Connected to http://localhost:3300/`);
    getUpdates.send('Test');
};

/**
 * Update info
 */
getUpdates.onmessage = function(event) {
    processData(event.data);
}
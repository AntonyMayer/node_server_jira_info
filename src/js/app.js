import processData from './modules/processData';

var getUpdates = new WebSocket("ws://localhost:3300/socketserver", "protocolOne");

getUpdates.onopen = function(event) {
    console.log(`Connected to http://localhost:3300/`);
    getUpdates.send('Test');
};

getUpdates.onmessage = function(event) {
    processData(event.data);
}
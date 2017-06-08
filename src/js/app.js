var getUpdates = new WebSocket("ws://localhost:3300/socketserver", "protocolOne"),
    stamp = Date.now();

getUpdates.onopen = function(event) {
    getUpdates.send(stamp);
    console.log(`Message__${stamp} send to server`);
};

getUpdates.onmessage = function(event) {
    console.log(event.data);
}
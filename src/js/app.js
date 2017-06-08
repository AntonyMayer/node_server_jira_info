var streamUpdates = new WebSocket("ws://localhost:3300/socketserver", "protocolOne");

streamUpdates.onopen = function (event) {
    streamUpdates.send("Message from browser;)"); 
    console.log('Message send to server');
};

streamUpdates.onmessage = function (event) {
  console.log(event.data);
}
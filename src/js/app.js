var exampleSocket = new WebSocket("ws://localhost:3300/socketserver", "protocolOne");

exampleSocket.onopen = function (event) {
    exampleSocket.send("Message;)"); 
    console.log('Message send');
};
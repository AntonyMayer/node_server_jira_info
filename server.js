const express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    app = express(),
    router = express.Router(),
    expressWs = require('express-ws')(app);

/**
 * Extending defaults
 */
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(router);

/**
 * Handle get requests
 */
// router.get('/', (req, res) => {
//     // do smth:)
// });

/**
 * Handle websocket conections
 */
app.ws('/socketserver', function(ws, req) {
    /**
     * Handle ws messages from browser
     */
    ws.on('message', function(stamp) {
        ws.send(`Message__${stamp} was received`);
    });
    /**
     * Handle post data updates from Jira CLI
     */
    router.post('/requests', (req, res) => {
        ws.send(JSON.stringify(req.body));
    });
});

/**
 * Connecting to DB and starting server if connection was succesfull 
 */
MongoClient.connect("mongodb://localhost:27017/jiraStat", function(err, db) {
    if (err) throw err;
    app.listen(3300);
    console.log('Listening on 3300');
});
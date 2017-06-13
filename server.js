const express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    app = express(),
    router = express.Router(),
    expressWs = require('express-ws')(app);

/**
 * Config
 */
var jira = {
    db: null, //reference to db
    temp: null, //reference to temp collection
    port: 7700
}

/**
 * Extending defaults
 */
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(router);

/**
 * Handle websocket conections
 */
app.ws('/socketserver', (ws, req) => {
    /**
     * Handle messages from browser
     */
    ws.on('message', (msg) => {
        jira.temp.find({}).toArray(function(err, tmp) {
            assert.equal(err, null);
            ws.send(JSON.stringify(tmp[0]));
        });
        ws.send(`{"message": "Server  >> Websocket opened"}`);
    });
    /**
     * Handle post data updates from Jira CLI
     */
    router.post('/requests', (req, res) => {
        //send update to browser
        ws.send(JSON.stringify(req.body));

        //write data to DB
        jira.temp.remove({});
        jira.temp.insert(req.body);

        res.end('Done');
    });
});

/**
 * Connecting to DB and starting server if connection was succesfull 
 */
MongoClient.connect("mongodb://localhost:27017/jiraStat", (err, db) => {
    if (err) throw err;

    jira.db = db;
    jira.temp = db.collection('records');

    app.listen(jira.port);

    console.log('Server >> MongoDB connected.');
    console.log(`Server >> Listening on ${jira.port}`);
});
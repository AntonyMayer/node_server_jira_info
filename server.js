const express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    app = express(),
    router = express.Router(),
    expressWs = require('express-ws')(app),
    events = require('events'),
    jiraUpdate = new events.EventEmitter();


/**
 * Config
 */
var jira = {
    url: "mongodb://localhost:27017/jiraStat",
    port: 7700
};

jiraUpdate.emit('update');

/**
 * Extending defaults
 */
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(router);

/**
 * Handle websocket conections
 */
router.ws('/socketserver', (ws, req) => {
    /**
     * Handle messages from browser
     */
    ws.on('message', (msg) => {
        console.log('\nServer >> Websocket opened');
        //update data on first browser connection
        MongoClient.connect(jira.url, function(err, db) {
            assert.equal(null, err);
            findDocuments(db, function(docs) {
                ws.send(JSON.stringify(docs[0]));
                db.close();
            });
        });

        ws.send(`{"message": "Server  >> Websocket opened"}`);
    });

    //check if connection still open
    console.log("status: " + ws.readyState);
    jiraUpdate.on('update', _ => {
        if (Number(ws.readyState) === 1) {
            console.log(`Data >> status ${ws.readyState} sending data to browser`);
            MongoClient.connect(jira.url, function(err, db) {
                assert.equal(null, err);
                findDocuments(db, function(docs) {
                    ws.send(JSON.stringify(docs[0]));
                    db.close();
                });
            });
        } else {
            console.log('Data >> no connection');
        }
    });

    ws.on('close', _ => {
        console.log('Server >> Websocket closed');
    });
});

/**
 * Listen for post updates from jiraCLI
 */
router.post('/requests', (req, res) => {
    //clear temporary data
    MongoClient.connect(jira.url, function(err, db) {
        assert.equal(null, err);
        removeDocument(db, "tmpJIRAdata", function() {
            updateDocuments(db, req.body, function() {
                db.close();
                // jiraUpdate.emit('update');
            });
        });
    });
    res.end('Done');
});

/**
 * Connecting to DB and starting server if connection was succesfull 
 */
MongoClient.connect(jira.url, (err, db) => {
    assert.equal(null, err);
    if (err) throw err;
    else console.log('Server >> MongoDB connected.');
    db.close();
    app.listen(jira.port);
    console.log(`Server >> Listening on ${jira.port}`);
});

/*****************************\
< * Mongo DB Utility methods * >
\*****************************/

var removeDocument = function(db, id, callback) {
    var collection = db.collection('tickets');
    collection.deleteOne({ _id: id }, function(err, result) {
        assert.equal(err, null);
        console.log(`\n${new Date()} \nRemoved temporary data`);
        callback(result);
    });
}

var updateDocuments = function(db, data, callback) {
    // console.log(data);
    var projectsCollection = db.collection('projects'),
        assigneesCollection = db.collection('assignees');
    
    //update 'project collection
    for (let project of data.projects) {
        project._id = project.project;
        projectsCollection.updateOne({ _id: project.project }, project, { upsert: true });
    }
    for (let assignee in data.assignees) { //for some reason I made it as an object ¯\_(ツ)_/¯
        // dv._id = ""
        assigneesCollection.updateOne({_id: assignee}, data.assignees[assignee], { upsert: true });
    }
    console.log('Data updated');
}

var findDocuments = function(db, callback) {
    var collection = db.collection('tickets');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log(`Data found`);
        callback(docs);
    });
}
const express = require('express'),
      bodyParser= require('body-parser'),
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
router.get('/', (req, res) => {
    // do smth:)
});

/**
 * Handle post requests
 */
router.post('/requests', (req, res) => {
  console.log('>> Post request received');
  console.log(req.body);
  res.end('>> Data updated');
});

/**
 * Handle websocket conections
 */
app.ws('/socketserver', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
});

/**
 * Connecting to DB and starting server if connection was succesfull 
 */
MongoClient.connect("mongodb://localhost:27017/jiraStat", function(err, db) {
    if (err) throw err;
    console.log('>> Connected to DB >> localhost:27017/jiraStat');
    app.listen(3300);
    console.log('>> Server started  >> Listening on 3300');
});
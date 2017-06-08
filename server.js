const express = require('express'),
      bodyParser= require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      app = express(),
      router = express.Router();

/**
 * Extending defaults
 */
app.use(bodyParser.urlencoded({extended: true}))
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
  console.log('post request received');
  console.log(req.body);
  res.end('Done!');
});

/**
 * Connecting to DB and starting server if connection was succesfull 
 */
MongoClient.connect("mongodb://localhost:27017/jiraStat", function(err, db) {
    if (err) throw err;
    console.log('>> Connected to DB');
    app.listen(3300);
    console.log('>> Server started');
});
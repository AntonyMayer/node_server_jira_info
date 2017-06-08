const express = require('express'),
      bodyParser= require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      app = express(),
      router = express.Router();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use(router);

router.get('/', (req, res) => {
    console.log('Connected');
});

router.post('/requests', (req, res) => {
  console.log('user request send');
  console.log(req.body);
  res.end('Lorem');
});

MongoClient.connect("mongodb://localhost:27017/jiraStat", function(err, db) {
    if (err) throw err;
    console.log('Connected to DB');
});

app.listen(3300);
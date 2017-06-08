const express = require('express'),
      bodyParser= require('body-parser'),
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
})

app.listen(3300);
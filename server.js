const express = require('express'),
      app = express(),
      router = express.Router(),
      compression = require('compression');

router.get('/', function(req, res) {
  res.end('Lorem');
});

app.use(express.static(__dirname + '/public'));
app.use(compression());
app.use(router);

app.listen(3300);
var express = require('express'),
    app = express();

var router = express.Router();

router.get('/', function(req, res) {
  res.end('Lorem:)');
});

app.use(router);

app.listen(3300);
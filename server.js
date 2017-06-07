const express = require('express'),
      app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3300, function () {
  console.log('Listening on port 3300!')
})
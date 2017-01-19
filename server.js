var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on ' + port);
});

/**
 * GET /
 * Get index of searches
 */
app.get('/', (req, res) => {
  res.render('index');
});

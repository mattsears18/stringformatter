var express = require('express');
var path = require('path');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on ' + port);
});

app.get('/', (req, res) => { res.render('index') });

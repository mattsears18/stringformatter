const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var db;

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://heroku_3zwvsqsq:446onvqsjjanf81skjhmf51it4@ds149278.mlab.com:49278/heroku_3zwvsqsq', (err, database) => {
  if (err) return console.log(err);
  db = database;

  port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log('listening on ' + port);
  });
});

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err, results) {
    if (err) return console.log(err);
    res.render('index.ejs', { quotes: results });
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if(err) return console.log(err);

    console.log('saved to databse');
    res.redirect('/');
  });
});

const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const app = express();

const Quote = require('./models/Quote');
const Pdf = require('./models/Pdf');
const Search = require('./models/Search');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_3zwvsqsq:446onvqsjjanf81skjhmf51it4@ds149278.mlab.com:49278/heroku_3zwvsqsq');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('listening on ' + port);
  });
});

app.get('/', (req, res) => {
  Pdf.collection.count(function(err, pdfCount) {
    Search.find(function (err, searches) {
      if (err) return console.error(err);
      res.render('index', {
        searches: searches,
        pdfCount: pdfCount
      });
    });
  });
});

app.post('/quotes', (req, res) => {
  var newQuote = new Quote(req.body);
  newQuote.save(function (err, quote) {
    if (err) console.log(err);
    console.log('saved to databse');

    res.redirect('/');
  });
});

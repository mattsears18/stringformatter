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

/**
 * GET /
 * Get index of searches
 */
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

/**
 * GET /searches/:id
 * Get index of searches
 */
app.get('/searches/:id', (req, res) => {
  Search.findById(req.params.id, function(err, search) {
    res.render('search', { search: search });
  });
});

/**
 * POST /searches
 * Adds new search to the database.
 */
app.post('/searches', (req, res) => {
  var data = req.body;
  data.createdAt = Date();

  var newSearch = new Search(data);
  newSearch.save(function (err, quote) {
    if (err) console.log(err);
    console.log('saved to databse');

    res.redirect('/');
  });
});

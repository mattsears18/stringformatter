var express = require('express');
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/public/uploads/' });

var app = express();

var Quote = require('./models/Quote');
var Article = require('./models/Article');
var Search = require('./models/Search');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
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
  Article.collection.count(function(err, articleCount) {
    Search.find(function (err, searches) {
      if (err) return console.error(err);
      res.render('index', {
        searches: searches,
        articleCount: articleCount
      });
    }).sort('-createdAt');
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

/**
 * POST /articles
 * Adds new article to the database.
 */
app.post('/articles', upload.array('pdfs', 1000), (req, res) => {
  req.files.forEach(function(file) {

    var newArticle = new Article(file);
    newArticle.save(function (err, quote) {
      if (err) console.log(err);
      console.log(file.originalname + ' saved to databse');
    });
  });

  res.redirect('/');




  /*
  var data = req.body;
  data.createdAt = Date();

  var newArticle = new Article(data);
  newArticle.save(function (err, quote) {
    if (err) console.log(err);
    console.log('saved to databse');

    res.redirect('/');
  });
  */
});

var mongoose = require('mongoose');

module.exports = mongoose.model('Search', new mongoose.Schema({
  term: String,
  resultCount: Number,
  results: String
}));

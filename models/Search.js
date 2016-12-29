var mongoose = require('mongoose');

module.exports = mongoose.model('Search', new mongoose.Schema({
  term: String,
  resultCount: { type: Number, default: 0 },
  results: String,
  createdAt: Date
}));

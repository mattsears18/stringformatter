var mongoose = require('mongoose');

module.exports = mongoose.model('Article', new mongoose.Schema({
  name: String,
  text: String,
  pageCount: Number,
  createdAt: Date
}));

var mongoose = require('mongoose');

module.exports = mongoose.model('Pdf', new mongoose.Schema({
  name: String,
  text: String,
  pageCount: Number
}));

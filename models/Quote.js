var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quoteSchema = new Schema({
  name: String,
  quote: String
});

var Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;

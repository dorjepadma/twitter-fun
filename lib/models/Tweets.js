const mongoose = require ('mongoose');
const getQuote = require('../services/quote');

const schema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});


schema.pre('validate', function(next) {
  if(this.text) return next();
  getQuote()
    .then(quote => this.text = quote)
    .then(() => next());  
});

module.exports = mongoose.model('Tweet', schema);

const mongoose = require ('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

// const Schema = new.mongoose.Schema({
// })

module.exports = mongoose.model('Tweets', tweetSchema);

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

tweetSchema.pre('save', function(next) {
  if(this.text) return next();
  getTweet()
    .then (randomTweet => this.text = randomTweet)
    .then(() => next());  
});

module.exports = mongoose.model('Tweets', tweetSchema);

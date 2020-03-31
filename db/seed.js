const Tweet = require('../lib/models/Tweet');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();


module.exports = async({ tweetsToCreate = 16, commentsToCreate = 28 } = {}) => {
  
  const handles = ['@happyvixen', '@mellowdude', '@spunkypuppy'];
  const tweets = await Tweet.create([...Array(tweetsToCreate)].map(() => ({
    handle: chance.pickone(handles),
    text: chance.sentence()
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    tweetId: chance.pickone(tweets)._id,
    handle: chance.pickone(handles),
    text: chance.sentence()
  })));
};

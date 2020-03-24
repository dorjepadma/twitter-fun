const request = require ('superagent');

module.exports = (randomTweet) => {
  return request
    .post('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .send({ content: randomTweet })
    .then(res => res.body.response)
    .then(({ randomTweet }) => randomTweet(({
      handle,
      tweets
    }) => ({ handle: handle, text: tweets })));
};

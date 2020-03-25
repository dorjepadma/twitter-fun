const { getTweet, getTweets, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweets');
const Comment = require('../lib/models/Comments');

describe('tweet routes', () => {
  it('creates a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: 'test',
        text: 'test 1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'test',
          text: 'test 1234',
          __v: 0
        });
      });
  });

  it('creates a tweet with random text', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: 'test',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'test',
          text: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a tweet by id', async() => {
    const tweet = await getTweet();
    const comments = await getComments({ tweetId: tweet._id });

    return request(app)
      .get(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...tweet,
          comments 
        });
      });
  });

  it('gets all tweets', async() => {
    const tweets = await getTweets();

    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        expect(res.body).toEqual(tweets);
      });
  });

  it('updates a tweet by id', async() => {
    const tweet = await getTweet();

    return request(app)
      .patch(`/api/v1/tweets/${tweet._id}`)
      .send({ text: '1234 test' })
      .then(res => {
        expect(res.body).toEqual({
          ...tweet,
          text: '1234 test'
        });
        // });
      });
  });

  it('deletes a tweet by id', async() => {
    const tweet = await getTweet();
    return request(app)
      .delete(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual(tweet);
        // });
      });
  });
});

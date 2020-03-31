const { getTweet, getTweets, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('tweet routes', () => {
  it('creates a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: 'politicaljunkie',
        text: 'vote out Trump'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'politicaljunkie',
          text: 'vote out Trump',
          __v: 0
        });
      });
  });

  it('creates a tweet with random text', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: 'politicaljunkie',
        text: 'vote out Trump',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'politicaljunkie',
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
      .send({ text: 'vote out Trump' })
      .then(res => {
        expect(res.body).toEqual({
          ...tweet,
          text: 'vote out Trump'
        });
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

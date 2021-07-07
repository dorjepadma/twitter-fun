const { getComment, getTweet } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comment routes', () => {
  it('creates a comment', async() => {
    const tweet = await getTweet();

    return request(app)
      .post('/api/v1/comments')
      .send({
        tweetId: tweet._id,
        handle: 'politicaljunkie',
        text: 'vote out Trump'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: tweet._id,
          handle: 'politicaljunkie',
          text: 'vote out Trump',
          __v: 0
        });
      });
  });

  it('gets a comment by id', async() => {
    const tweet = await getTweet();
    const comment = await getComment({ tweetId: tweet._id });

    return request(app)
      .get(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          tweetId: tweet
        });
      });
  });

  it('updates a comment by id', async() => {
    const comment = await getComment();

    return request(app)
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ text: 'No Bueno!' })
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          text: 'No Bueno!'
        });
      });
  });

  it('deletes a comment by id', async() => {
    const comment = await getComment();

    return request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });

});

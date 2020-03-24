const { Router } = require('express');
const Tweets = require('../models/Tweets');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', (req, res, next) => {
    Tweets
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweets
      .find()
      .select({ notes: false })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tweets
      .findById(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Tweets
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tweets
      .findByIdAndDelete(req.params.id)
      .then(Tweets => res.send(Tweets))
      .catch(next);
  });
  

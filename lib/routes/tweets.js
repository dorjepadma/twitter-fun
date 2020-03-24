const { Router } = require('express');
const Tweets = require('../models/Tweets');

module.exports = Router()
  .post('./', (req, res,) => {
    Tweets
      .create(req.body)
      .then(tweet => res.send(tweet));
  })

  .get('/', (req, res) => {
    Tweets
      .find()
      .select({ notes: false })
      .then(tweet => res.send(tweet));
  })

  .get('/:id', (req, res) => {
    Tweets
      .findById(req.params.id)
      .then(tweet => res.send(tweet));
  })

  .patch('/:id', (req, res) => {
    Tweets
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(tweet => res.send(tweet));
  })

  .delete('/:id', (req, res) => {
    Tweets
      .findByIdAndDelete(req.params.id)
      .then(Tweets => res.send(Tweets));
  });
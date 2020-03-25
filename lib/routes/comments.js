const { Router } = require('express');
const Comments = require('../models/Comments');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', (req, res, next) => {
    Comments
      .create(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Comments
      .findById()
      .populate(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Comments
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Comments
      .findByIdAndDelete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });


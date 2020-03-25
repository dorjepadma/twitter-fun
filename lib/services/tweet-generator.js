const request = require ('superagent');

module.exports = (quotes) => request
  .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
  .then(res => res.body)
  .then(([{ tweet }]) => tweet);

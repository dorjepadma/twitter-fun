const request = require ('superagent');

module.exports = () => request
  .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
  .then(res => res.body)
  .then(([{ quote }]) => quote);

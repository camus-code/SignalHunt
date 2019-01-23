// server.js
const express = require('express');
const app = express();
const rp = require('request-promise');

// Requests to http://localhost:8000/ will respond with a JSON object
app.get('/', (req, res) => {
   res.json({success: true});
});

app.listen(8000, () => console.log("Listening on port 8000!"));


// All tickers route (1 -- 100)
app.get('/tickers', (req, res) => {
	const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 250,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'd75ae6ac-824a-4708-9952-e90df6c4f840'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
  res.send(response);
}).catch((err) => {
  console.log('API call error:', err.message);
})});


// Search Route ()
app.get('/search', (req, res) => {
	const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
    convert: 'USD',
    symbol: 'BTC'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'd75ae6ac-824a-4708-9952-e90df6c4f840'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then((response, req) => {
  console.log('API call response:', response);
  console.log(req.query.parent)
  res.send(response);
}).catch((err) => {
  console.log('API call error:', err.message);
})});


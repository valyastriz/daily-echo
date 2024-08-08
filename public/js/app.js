// will hold Frontend JavaScript

const express = require('express');
const app = express();
const entryRoute = require('./entryroute');

app.use('/', entryRoute);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

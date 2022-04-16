const express = require('express');

const app = express();
const api = require('./api');

app.use(express.json());

app.use('/api', api);

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = '' } = err;

  if (err?.name === 'validationError') {
    statusCode = 422;
    message = 'Invalid credentials';
  }

  res.status(statusCode);
  res.send(message);
});

module.exports = app;

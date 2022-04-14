const express = require('express');

const app = express();
const api = require('./api');

app.use(express.json());

app.use('/api', api);

app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  let { status = 500, message = '' } = err;

  if (err?.name === 'validationError') {
    status = 422;
    message = 'Invalid credentials';
  }

  res.status(status);
  res.send(message);
});

module.exports = app;

const express = require('express');

const app = express();

app.get('/api/favs', (req, res, next) => {
  res.json({
    success: true,
  });
});

module.exports = app;

const express = require('express');

const favs = require('./favs/routes');

const router = express.Router();

router.use('/favs', favs);

module.exports = router;

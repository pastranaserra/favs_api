const express = require('express');

const users = require('./users/routes');
const favs = require('./favs/routes');

const router = express.Router();

router.use('/users', users);
router.use('/favs', favs);

module.exports = router;

const express = require('express');

const users = require('./users/routes');
const favs = require('./favs/routes');
const { isAuthenticated } = require('../auth');

const router = express.Router();

router.use('/users', users);
router.use('/favs', isAuthenticated, favs);

module.exports = router;

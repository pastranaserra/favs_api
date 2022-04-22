const express = require('express');

const router = express.Router();

const controller = require('./controller');

router.route('/local/login').post(controller.login);

module.exports = router;

const express = require('express');
const listsRoutes = require('../lists/routes');
const router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.list).post(controller.create);

router.use('/:userId/lists', listsRoutes);

module.exports = router;

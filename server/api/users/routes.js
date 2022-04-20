const express = require('express');

const router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.list).post(controller.create);

router.param('userId', controller.id);

router.route('/:userId').get().put().delete(controller.delete);

module.exports = router;

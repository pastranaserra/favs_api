const express = require('express');

const router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.list);
router.route('/signup').post(controller.signup);

router.param('userId', controller.id); // middleware that verifies if the param (userId) exists

router.route('/:userId').get().put(controller.update).delete(controller.delete);

module.exports = router;

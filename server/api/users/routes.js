const express = require('express');

const router = express.Router();

const controller = require('./controller');

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.param('userId', controller.id);

router.route('/:userId').get().put(controller.update).delete(controller.delete);

module.exports = router;

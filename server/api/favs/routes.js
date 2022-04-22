const express = require('express');
const { sanitizers } = require('./model');

const router = express.Router();
const { own } = require('../../auth');

const controller = require('./controller');

router.route('/').get(controller.list).post(sanitizers, controller.create);

router.param('Id', controller.id);

router
  .route('/:Id')
  .get(controller.read)
  .put(own, sanitizers, controller.update)
  .delete(own, controller.delete);

module.exports = router;

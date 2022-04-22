const express = require('express');
const { sanitizers } = require('./model');

const router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.list).post(sanitizers, controller.create);

router.param('Id', controller.id);

router
  .route('/:Id')
  .get(controller.read)
  .put(sanitizers, controller.update)
  .delete(controller.delete);

module.exports = router;

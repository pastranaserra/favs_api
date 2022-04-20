const express = require('express');

const router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.list).post(controller.create);

router.param('Id', controller.id);

router
  .route('/:Id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;

const express = require('express');

const router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.list).post(controller.create);
router
  .route('/:listId')
  .get(controller.read)
  .put(controller.modify)
  .delete(controller.delete);

module.exports = router;
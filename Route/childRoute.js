const express = require('express');
const controller = require('../Controller/childController');
const {
  insertChild,
  updateChild,
  checkId,
} = require('../MW/validations/childValidators');
const validator = require('../MW/validations/validator');
const router = express.Router();
const { isAdminUser, isAdmin, isUser } = require('../MW/Auth/authenticationMW');

router
  .route('/children')
  .all(isAdmin)
  .get(controller.getAllChildren)
  .post(insertChild, validator, controller.addChild);

router
  .route('/children/:id')
  .all(isAdmin)
  .get(checkId, validator, controller.getChild)
  .put(checkId, updateChild, validator, controller.updateChild)
  .delete(checkId, validator, controller.deleteChild);

module.exports = router;

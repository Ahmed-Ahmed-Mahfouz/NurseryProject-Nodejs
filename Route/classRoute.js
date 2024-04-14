const express = require('express');
const controller = require('../Controller/classController');
const {
  insertClass,
  updateClass,
  checkId,
} = require('../MW/validations/classValidators');
const validator = require('../MW/validations/validator');
const router = express.Router();
const { isAdminUser, isAdmin, isUser } = require('../MW/Auth/authenticationMW');

router
  .route('/classes')
  .get(isAdminUser, controller.getAllClasses)
  .post(isAdmin, insertClass, validator, controller.addClass);

router
  .route('/classes/:id')
  .all(isAdmin)
  .get(checkId, validator, controller.getClass)
  .put(checkId, updateClass, validator, controller.updateClass)
  .delete(checkId, validator, controller.deleteClass);

router.get(
  '/classes/children/:id',
  isAdminUser,
  checkId,
  validator,
  controller.getClassChildren
);

router.get(
  '/classes/teachers/:id',
  isAdminUser,
  checkId,
  validator,
  controller.getClassSupervisor
);

module.exports = router;

const express = require('express');
const controller = require('../Controller/teacherController');
const {
  insertTeacher,
  updateTeacher,
  checkId,
} = require('../MW/validations/teacherValidators');
const validator = require('../MW/validations/validator');
const router = express.Router();
const { isAdminUser, isAdmin, isUser } = require('../MW/Auth/authenticationMW');

router
  .route('/teachers')
  .get(isAdminUser, controller.getAllTeachers)
  .post(isAdmin, insertTeacher, validator, controller.addTeacher);

router.get('/teachers/supervisors', controller.getAllSupervisors);

router
  .route('/teachers/:id')
  .all(isAdmin)
  .get(checkId, validator, controller.getTeacher)
  .put(checkId, updateTeacher, validator, controller.updateTeacher)
  .delete(checkId, validator, controller.deleteTeacher);

module.exports = router;

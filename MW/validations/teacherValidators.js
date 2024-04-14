const { body, query, param } = require('express-validator');

exports.insertTeacher = [
  body('_id').isMongoId().withMessage('teacher id should be a valid objectID'),
  body('fullname')
    .isString()
    .withMessage('teacher name should be string')
    .notEmpty()
    .withMessage('teacher name should not be empty'),
  body('password').isString().notEmpty().withMessage('password is required'),
  body('email').isEmail().withMessage('email should be valid'),
  body('image').isString().withMessage('image should be string'),
];

exports.updateTeacher = [
  body('_id').isMongoId().withMessage('Teacher id should be a valid objectID'),
  body('fullname')
    .optional()
    .isString()
    .withMessage('Fullname should be a string')
    .notEmpty()
    .withMessage('Fullname should not be empty'),
  body('password')
    .isString()
    .optional()
    .notEmpty()
    .withMessage('Password is required'),
  body('email').optional().isEmail().withMessage('Email should be valid'),
  body('image').optional().isString().withMessage('Image should be a string'),
];

exports.checkId = [
  param('id').isMongoId().withMessage('Teacher id should be a valid objectID'),
];

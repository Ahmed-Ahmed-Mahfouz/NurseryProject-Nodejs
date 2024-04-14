const { body, query, param } = require('express-validator');

exports.insertClass = [
  body('name')
    .isString()
    .withMessage('Class name should be a string')
    .notEmpty()
    .withMessage('Class name should not be empty'),
  body('supervisor')
    .isMongoId()
    .withMessage('Supervisor (teacher id) should a valid objectID'),
  body('children')
    .isArray({ min: 1 })
    .withMessage('Children should be an array with at least one child id'),
  body('children.*').isNumeric().withMessage('Child id should be a number'),
];

exports.updateClass = [
  body('_id').isInt().withMessage('Class id should be a number'),
  body('name')
    .optional()
    .isString()
    .withMessage('Class name should be a string')
    .notEmpty()
    .withMessage('Class name should not be empty'),
  body('supervisor')
    .optional()
    .isMongoId()
    .withMessage('Supervisor (teacher id) should be a valid objectID'),
  body('children')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Children should be an array with at least one child id'),
  body('children.*')
    .optional()
    .isInt()
    .withMessage('Child id should be a number'),
];

exports.checkId = [
  param('id').isInt().withMessage('Children id should be a number'),
];

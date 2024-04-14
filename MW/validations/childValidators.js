const { body, query, param } = require('express-validator');

exports.insertChild = [
  body('_id').isInt().withMessage('Child id should be a number'),
  body('fullName')
    .isString()
    .withMessage('Full name should be a string')
    .notEmpty()
    .withMessage('Full name should not be empty'),
  body('age').isInt({ min: 0 }).withMessage('Age should be a positive integer'),
  body('level')
    .isIn(['PreKG', 'KG1', 'KG2'])
    .withMessage('Level should be one of PreKG, KG1, KG2'),
  body('address.city')
    .isString()
    .withMessage('City should be a string')
    .notEmpty()
    .withMessage('City should not be empty'),
  body('address.street')
    .isString()
    .withMessage('Street should be a string')
    .notEmpty()
    .withMessage('Street should not be empty'),
  body('address.building')
    .isString()
    .withMessage('Building should be a string')
    .notEmpty()
    .withMessage('Building should not be empty'),
];

exports.updateChild = [
  body('_id').isInt().withMessage('Child id should be a number'),
  body('fullName')
    .optional()
    .isString()
    .withMessage('Full name should be a string')
    .notEmpty()
    .withMessage('Full name should not be empty'),
  body('age')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Age should be a positive integer'),
  body('level')
    .optional()
    .isIn(['PreKG', 'KG1', 'KG2'])
    .withMessage('Level should be one of PreKG, KG1, KG2'),
  body('address.city').optional(),
];

exports.checkId = [
  param('id').isInt().withMessage('Teacher id should be a number'),
];

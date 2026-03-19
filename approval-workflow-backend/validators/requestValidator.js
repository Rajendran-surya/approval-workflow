const { body, param } = require('express-validator');

exports.createRequestValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('requestedBy').notEmpty().withMessage('Requested by is required'),
  body('requestType').isIn(['LEAVE', 'EXPENSE', 'GENERAL']).withMessage('Invalid request type')
];

exports.statusUpdateValidator = [
  param('id').isInt().withMessage('ID must be an integer'),
  body('status').isIn(['APPROVED', 'REJECTED']).withMessage('Status must be APPROVED or REJECTED')
];
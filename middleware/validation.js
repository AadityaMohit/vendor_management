const { body } = require('express-validator');

exports.validateVendor = [
  body('name').notEmpty().withMessage('Name is required'),
  body('bankAccountNumber').notEmpty().withMessage('Bank Account Number is required'),
  body('bankName').notEmpty().withMessage('Bank Name is required'),
];

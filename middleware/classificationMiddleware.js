const { body } = require('express-validator');

exports.validateClassification = [
    body('classificationName')
        .notEmpty().withMessage('Classification name is required.')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('No spaces or special characters allowed.')
];
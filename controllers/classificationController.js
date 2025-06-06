const { validationResult } = require('express-validator');
const classificationModel = require('../models/classificationModel');

/*exports.addClassificationView = (req, res) => {
    res.render('inventory/addClassification', {
        oldInput: req.session.oldInput || {},
        errors: req.session.errors || {}
    });
    req.session.oldInput = null;
    req.session.errors = null;
};*/


/*exports.addClassificationView = (req, res) => {
  res.render('inventory/add-classification', {
    oldInput: req.session.oldInput || {},
    errors: req.session.errors || {},
    flashMessage: req.session.flashMessage || ''
  });
  req.session.oldInput = null;
  req.session.errors = null;
  req.session.flashMessage = null;
};*/

/*exports.addClassificationView = (req, res) => {
  res.send("Yes! The route works.");
};*/

exports.addClassificationView = (req, res) => {
  res.render('inventory/add-classification', {  // or 'classification/add-classification' if that’s your folder
    oldInput: req.session.oldInput || {},
    errors: req.session.errors || {},
    flashMessage: req.session.flashMessage || ''
  });
  req.session.oldInput = null;
  req.session.errors = null;
  req.session.flashMessage = null;
};

exports.addClassification = async (req, res) => {
    req.session.oldInput = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors.mapped();
        return res.redirect('/inv/add-classification');
    }

    try {
        await classificationModel.addClassification(req.body.classificationName);
        req.session.flashMessage = 'Classification added successfully!';
        res.redirect('/inv');
    } catch (error) {
        req.session.errors = { general: 'Failed to add classification.' };
        res.redirect('/inv/add-classification');
    }
};
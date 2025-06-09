
/*const invModel = require("../models/inventoryModel")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** *
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
const className = data[0].classification_name
  
res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}



//Mnagement//

exports.managementView = (req, res) => {
    res.render('inventory/management', {
        flashMessage: req.session.flashMessage || null
    });
    req.session.flashMessage = null; // Clear flash message after displaying
};



//Management 2//

const { validationResult } = require('express-validator');
const inventoryModel = require('../models/inventoryModel');
const classificationModel = require('../models/classificationModel');
const buildClassificationList = require('../utils/buildClassificationList');

exports.addInventoryView = async (req, res) => {
  try {
    const classificationList = await buildClassificationList();

    res.render('inventory/addInventory', {
      classificationList,
      oldInput: {},       // Empty object initially; used to hold sticky data on error
      errors: {},         // Placeholder for validation errors
      flashMessage: null  // Optional: Add flash messaging logic if needed
    });

  } catch (error) {
    console.error("Error rendering add inventory view:", error);
    res.status(500).send("Server Error");
  }
};
 




















 module.exports = invCont*/




 const invModel = require("../models/inventoryModel")
const utilities = require("../utilities/")
const classificationModel = require('../models/classificationModel');
const buildClassificationList = require('../utilities/buildClassificationList');
const { validationResult } = require('express-validator');

const invCont = {}

/* ***************************
 * Build inventory by classification view
 ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name
  
    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Management view
 ************************** *
invCont.managementView = (req, res) => {
  res.render('inventory/management', {
    flashMessage: req.session.flashMessage || null
  });
  req.session.flashMessage = null;
}*/






invCont.managementView = async (req, res, next) => {
  try {
    const nav = await utilities.getNav()
    const flashMessage = req.session.flashMessage || null
    req.session.flashMessage = null

    res.render('inventory/management', {
      title: "Inventory Management",
      nav,
      flashMessage
    })
  } catch (err) {
    next(err)
  }
}


/* ***************************
 * Add Inventory View
 ************************** *
invCont.addInventoryView = async (req, res) => {
  try {
    const classificationList = await buildClassificationList();

    res.render('inventory/addInventory', {
      classificationList,
      oldInput: {},
      errors: {},
      flashMessage: null
    });
  } catch (error) {
    console.error("Error rendering add inventory view:", error);
    res.status(500).send("Server Error");
  }
}*/


invCont.addInventoryView = async (req, res) => {
  try {
    const classificationList = await buildClassificationList();

    res.render('inventory/addInventory', {
      title: 'Add Inventory',    // Add this line
      classificationList,
      oldInput: {},
      errors: {},
      flashMessage: null
    });
  } catch (error) {
    console.error("Error rendering add inventory view:", error);
    res.status(500).send("Server Error");
  }
}








invCont.addInventory = async (req, res) => {
  const errors = validationResult(req);
  const classificationList = await buildClassificationList();

  if (!errors.isEmpty()) {
    return res.render('inventory/addInventory', {
      classificationList,
      oldInput: req.body,
      errors: errors.mapped(),
      flashMessage: null
    });
  }

  try {
    await invModel.addInventory(req.body); // make sure model exists
    req.session.flashMessage = 'Inventory added successfully!';
    res.redirect('/inv');
  } catch (err) {
    console.error(err);
    res.render('inventory/addInventory', {
      classificationList,
      oldInput: req.body,
      errors: { general: 'Failed to add inventory' },
      flashMessage: null
    });
  }
};












// controllers/inventoryController.js
//const invModel = require('../models/inventoryModel');//
//const utilities = require('../utilities');//

const showVehicleDetails = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    console.log('Requested vehicleId:', vehicleId);
    const vehicleData = await invModel.getVehicleById(vehicleId);
    if (!vehicleData) {
      return res.status(404).render('error', { message: 'Vehicle not found' });
    }
    const vehicleDetailsHtml = utilities.buildVehicleDetailHtml(vehicleData);
    res.render('inventory/vehicleDetail', {
      title: `${vehicleData.make} ${vehicleData.model} Details`,
      vehicleDetailsHtml,
    });
  } catch (error) {
    next(error);
  }
};


// *** CHANGE STARTS HERE ***
// Add showVehicleDetails function into invCont object
invCont.showVehicleDetails = showVehicleDetails;

// Export the combined invCont object with all functions
module.exports = invCont;
// *** CHANGE ENDS HERE ***


 





 
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const classificationController = require("../controllers/classificationController");

// Show vehicle details (e.g., /inv/123)
//router.get('/:id', invController.showVehicleDetails);//

router.get('/detail/:id', invController.showVehicleDetails);

// Build classification inventory page (e.g., /inv/type/5)
router.get("/type/:classificationId", invController.buildByClassificationId);

// Inventory Management main page (e.g., /inv)
router.get("/", invController.managementView);

// Add Classification Form
router.get("/inv/add-classification", classificationController.addClassificationView);
router.post(
  "/inv/add-classification",
  body("classificationName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required."),
  classificationController.addClassification
);

// Add Inventory Form
router.get("/inv/add-inventory", invController.addInventoryView);
router.post(
  "/inv/add-inventory",
  [
    body("inv_make").notEmpty().withMessage("Make is required"),
    body("inv_model").notEmpty().withMessage("Model is required"),
    body("inv_year").isInt({ min: 1900, max: 2099 }).withMessage("Year must be valid"),
    body("inv_description").notEmpty().withMessage("Description is required"),
    body("inv_image").notEmpty().withMessage("Image path is required"),
    body("inv_thumbnail").notEmpty().withMessage("Thumbnail path is required"),
    body("inv_price").isFloat({ min: 0 }).withMessage("Price must be a number"),
    body("inv_miles").isInt({ min: 0 }).withMessage("Miles must be a number"),
    body("inv_color").notEmpty().withMessage("Color is required"),
    body("classification_id").isInt().withMessage("Classification must be selected")
  ],
  invController.addInventory
);
module.exports = router
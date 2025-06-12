/*const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const classificationController = require("../controllers/classificationController");

const { checkJWT, checkRole } = require("../middleware/auth")

/**
 * Route to display the edit form for an inventory item
 * Path: /inv/edit/:inventory_id
 *
router.get('/edit/:inventory_id', invController.editInventoryView);


// Show vehicle details (e.g., /inv/123)
//router.get('/:id', invController.showVehicleDetails);//

router.get('/detail/:id', invController.showVehicleDetails);

// Build classification inventory page (e.g., /inv/type/5)
router.get("/type/:classificationId", invController.buildByClassificationId);

//const utilities = require('../utilities/utilities');//

router.get("/getInventory/:classification_id", invController.getInventoryJSON);

// Inventory Management main page (e.g., /inv)
router.get("/", invController.managementView);

// Add Classification Form
router.get("/add-classification", classificationController.addClassificationView);
router.post(
  "/add-classification",
  body("classificationName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required."),
  classificationController.addClassification
);

// Add Inventory Form
router.get("/add-inventory", invController.addInventoryView);
router.post(
  "/add-inventory",
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

  

router.get("/add", checkJWT, checkRole(["Employee", "Admin"]), invController.buildAddVehicle)
router.post("/add", checkJWT, checkRole(["Employee", "Admin"]), validateVehicle, invController.addVehicle)













  invController.addInventory
);
module.exports = router*/



















const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

const invController = require("../controllers/invController");
const classificationController = require("../controllers/classificationController");
const { checkJWT, checkRole } = require("../middleware/auth");
const { validateVehicle } = require("../utilities/validation");

// Route: Display edit form for a specific inventory item
router.get("/edit/:inventory_id", checkJWT, checkRole(["Employee", "Admin"]), invController.editInventoryView);

// Route: Show vehicle details
router.get("/detail/:id", invController.showVehicleDetails);

// Route: Get inventory by classification ID as JSON
router.get("/getInventory/:classification_id", invController.getInventoryJSON);

// Route: Show inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route: Main Inventory Management view
router.get("/", checkJWT, checkRole(["Employee", "Admin"]), invController.managementView);

// Route: Show Add Classification form
router.get("/add-classification", checkJWT, checkRole(["Employee", "Admin"]), classificationController.addClassificationView);

// Route: Handle Add Classification POST
router.post(
  "/add-classification",
  checkJWT,
  checkRole(["Employee", "Admin"]),
  body("classificationName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required."),
  classificationController.addClassification
);

// Route: Show Add Inventory form
router.get("/add-inventory", checkJWT, checkRole(["Employee", "Admin"]), invController.addInventoryView);

// Route: Handle Add Inventory POST (old version kept for compatibility)
router.post(
  "/add-inventory",
  checkJWT,
  checkRole(["Employee", "Admin"]),
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

/* Optional new routes with shared validation middleware
router.get("/add", checkJWT, checkRole(["Employee", "Admin"]), invController.addInventory);
router.post("/add", checkJWT, checkRole(["Employee", "Admin"]), validateVehicle, invController.editInventoryView);*/

module.exports = router;
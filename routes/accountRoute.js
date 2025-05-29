// routes/accountRoute.js
const regValidate = require('../utilities/account-validation')

const express = require("express");
const router = express.Router();
const utilities = require("../utilities"); // Adjust if your path differs
const accountController = require("../controllers/accountController"); // You will create this later


// Route for the "My Account" page
router.get("/", utilities.handleErrors(accountController.buildLogin));

router.get("/register", utilities.handleErrors(accountController.buildRegister));
// Process the registration data

router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)



// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

// Export the router
module.exports = router;
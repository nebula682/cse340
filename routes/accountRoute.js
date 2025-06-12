/*routes/accountRoute.js
const regValidate = require('../utilities/account-validation')

const express = require("express");
const router = express.Router();
const utilities = require("../utilities"); // Adjust if your path differs
const accountController = require("../controllers/accountController"); // You will create this later

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));


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





/* Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)/



// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)



// Export the router
module.exports = router;*/




/*const express = require("express");
const router = express.Router();
const regValidate = require('../utilities/account-validation');
const utilities = require("../utilities");
const accountController = require("../controllers/accountController");

// Account management page (requires login)
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

// Login page
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process login
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;*/


const express = require("express");
const router = express.Router();
const regValidate = require('../utilities/account-validation');
const utilities = require("../utilities");
const accountController = require("../controllers/accountController");

// Account management page (requires login)
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));

// Login page
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

 //Process login
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);


router.post(
  "/update",
  regValidate.updateRules(),  // Optional: add validation
  regValidate.checkUpdateData, // Optional: add validation
  utilities.checkLogin,
  utilities.handleErrors(accountController.updateAccount)
)


router.post(
  "/update-password",
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.checkLogin,
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router;
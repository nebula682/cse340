const { body } = require("express-validator")


body("account_password")
  .trim()
  .isLength({ min: 12 })
  .withMessage("Password must be at least 12 characters long")
  .matches(/[0-9]/).withMessage("Password must contain a number")
  .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
  .matches(/[^A-Za-z0-9]/).withMessage("Password must contain a special character")
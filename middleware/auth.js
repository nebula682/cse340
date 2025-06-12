// ===== middleware/auth.js =====
const jwt = require("jsonwebtoken")
require("dotenv").config()

function checkJWT(req, res, next) {
  const token = req.cookies.jwt
  if (!token) {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    res.locals.accountData = decoded
     res.locals.loggedin = true; //
    next()
  } catch (err) {
    res.clearCookie("jwt")
    req.flash("notice", "Session expired. Please log in again.")
    return res.redirect("/account/login")
  }
}

function checkRole(roles) {
  return (req, res, next) => {
    if (roles.includes(res.locals.accountData.account_type)) {
      next()
    } else {
      req.flash("notice", "Access denied.")
      return res.redirect("/account/login")
    }
  }
}

module.exports = { checkJWT, checkRole }
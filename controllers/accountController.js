const utilities = require("../utilities");

const accountModel = require("../models/account-model")

const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}






/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();

  res.render("account/register", {
    title: "Register",
    nav,
    firstname: req.body?.firstname,
    lastname: req.body?.lastname,
    email: req.body?.email,
    message: req.flash("notice"), // optional, if using flash messages
    errors: null,
  });
}





/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}



/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      //return res.redirect("/account/")//
      res.redirect("/account");
    }
    else {
      req.flash(" notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}


async function buildAccountManagement(req, res) {
  const nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
    messages: req.flash()
  })
}



//const accountModel = require("../models/accountModel")//
const bcrypt = require("bcryptjs")

/*async function buildAccountManagement(req, res) {
  const { account_firstname, account_type account_id } = res.locals.accountData
  res.render("account/management", {
    title: "Account Management",
    account_firstname,
    account_type,
  })
}*/

function buildAccountManagement(req, res, next) {
const { account_firstname, account_type, account_id } = res.locals.accountData
res.render("account/management", {
  title: "Account Management",
  account_firstname,
  account_type,
  account_id,
})
}

async function buildAccountUpdateView(req, res) {
  const account_id = req.params.id
  const data = await accountModel.getAccountById(account_id)
  res.render("account/update", {
    title: "Update Account",
    errors: null,
    account: data,
  })
}

/*async function updateAccount(req, res) {
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  const updateResult = await accountModel.updateAccount(account_firstname, account_lastname, account_email, account_id)
  if (updateResult) {
    req.flash("notice", "Account updated.")
    return res.redirect("/account/manage")
  }
  req.flash("notice", "Update failed.")
  res.redirect(`/account/update/${account_id}`)
}*/



/*async function updateAccount(req, res, next) {
const existing = await accountModel.getAccountByEmail(account_email)
if (existing && existing.account_id != account_id) {
  req.flash("notice", "That email is already in use.")
  return res.redirect(`/account/update/${account_id}`)
}
}*/

async function updateAccount(req, res) {
  const { account_firstname, account_lastname, account_email, account_id } = req.body

  // Check if email already exists
  const existing = await accountModel.getAccountByEmail(account_email)
  if (existing && existing.account_id != account_id) {
    req.flash("notice", "That email is already in use.")
    return res.redirect(`/account/update/${account_id}`)
  }

  const updateResult = await accountModel.updateAccount(account_firstname, account_lastname, account_email, account_id)
  if (updateResult) {
    req.flash("notice", "Account updated.")
    return res.redirect("/account")
  } else {
    req.flash("notice", "Update failed.")
    return res.redirect(`/account/update/${account_id}`)
  }
}








async function updatePassword(req, res) {
  const { account_password, account_id } = req.body
  try {
    const hashedPassword = await bcrypt.hash(account_password, 10)
    const result = await accountModel.updatePassword(hashedPassword, account_id)
    if (result) {
      req.flash("notice", "Password updated.")
      return res.redirect("/account/manage")
    }
  } catch (err) {
    req.flash("notice", "Password update failed.")
  }
  res.redirect(`/account/update/${account_id}`)
}


// Logout controller
function logout(req, res) {
  res.clearCookie("jwt")
  req.flash("notice", "You have successfully logged out.")
  res.redirect("/account/login")
}



















module.exports = { buildLogin, buildRegister,registerAccount, accountLogin, buildAccountManagement,
  buildAccountUpdateView,
  updateAccount,
  updatePassword,logout }
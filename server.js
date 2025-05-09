/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
/* ***********************
 * View Engine and Templates
 *************************
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root



/* ***********************
 * Routes
 *************************
app.use(static)

//index route
app.get("/", function(req, res){
  res.render("index", {title:"Home"})
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const path = require("path")
const static = require("./routes/static")

const app = express()

/* ***********************
 * Static Files Middleware - THIS WAS MISSING
 *************************/
app.use(express.static(path.join(__dirname, "public")))

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // assuming you have layouts/layout.ejs

/* ***********************
 * Routes
 *************************/
app.use(static)

// index route
app.get("/", function(req, res){
  res.render("index", { title: "Home" })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})

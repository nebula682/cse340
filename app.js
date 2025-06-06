/*const express = require('express');
const app = express();
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








const express = require('express');
//const app = express();//

// Import routes
const inventoryRoutes = require('./routes/inventory');
app.use('/inventory', inventoryRoutes);

// Import and use error handler middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);  // This must be after all your routes





const errorHandler = require('./middleware/errorHandler');

// Your routes...
app.use('', inventoryRoutes);

// Catch-all 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Global error handler
app.use(errorHandler);










// Start the server
//const PORT = process.env.PORT || 3000;//
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/





const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

// Middleware to handle POST requests
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Routes
const inventoryRoutes = require('./routes/inventory');
app.use('/inv', inventoryRoutes); // all /inv/* routes work now

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Global error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


























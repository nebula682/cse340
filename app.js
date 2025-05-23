const express = require('express');
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

// Start the server
//const PORT = process.env.PORT || 3000;//
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






















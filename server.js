// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Import your main routes file

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define the base URL for your API
const API_BASE_URL = '/api';

// Include the routes
app.use(API_BASE_URL, routes); // Mount your main routes under the '/api' base URL

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

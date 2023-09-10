// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes.js';
import postgres from './config/db.config.js';

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
postgres();

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

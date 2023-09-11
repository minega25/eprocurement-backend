// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './server/config/db.js';

import routes from './routes.mjs';

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

const initApp = async () => {
  console.log('Testing the database connection..');
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.original);
  }
};

initApp();

//
import express from 'express';
import helloRoutes from './server/api/hello/index.js';

const router = express.Router();

// Import middleware for user authentication and authorization
// const { authenticateUser, checkUserRole } = require('./middleware/auth');

// Import route handlers

// // Protected route (requires authentication)
// router.use('/api/protected', authenticateUser, (req, res) => {
//   res.json({ message: 'This is a protected route requiring authentication.' });
// });

// // Protected route with role-based access control
// router.use(
//   '/api/admin',
//   authenticateUser,
//   checkUserRole('admin'), // Check if the user has the 'admin' role
//   (req, res) => {
//     res.json({ message: 'This is an admin-only protected route.' });
//   }
// );

// Include the routes for specific features/modules
router.use('/hello/', helloRoutes);

export default router;

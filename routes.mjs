import express from 'express';
import login from './server/api/login/index.mjs';
import register from './server/api/register/index.mjs';
import verifyToken from './server/api/verifyToken/index.mjs';

const router = express.Router();

// Import middleware for user authentication and authorization
// const { authenticateUser, checkUserRole } = require('./server/middleware/auth');

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
router.use('/login', login);
router.use('/register', register);
router.use('/verify', verifyToken);

export default router;

import express from 'express';
import login from './server/api/login/index.mjs';
import register from './server/api/register/index.mjs';
import verifyToken from './server/api/verifyToken/index.mjs';
import procurementRequests from './server/api/procurementRequests/index.mjs';
import tenders from './server/api/tenders/index.mjs';

const router = express.Router();

// Import middleware for user authentication and authorization
import { verifyTokenAndRoles } from './server/middleware/auth.mjs';

// Include the routes for specific features/modules
router.use('/login', login);
router.use('/register', register);
router.use('/verify', verifyToken);
router.use(
  '/procurement_requests',
  verifyTokenAndRoles(['admin', 'procurement_officer']),
  procurementRequests
);
router.use('/tenders', verifyTokenAndRoles(['admin', 'bank_user']), tenders);

export default router;

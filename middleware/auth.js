const passport = require('passport');

// Middleware for user authentication using Passport.js
exports.authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }
    // Store the authenticated user in the request object
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware for role-based access control
exports.checkUserRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      // User has the required role, so allow access
      next();
    } else {
      // User does not have the required role, deny access
      res.status(403).json({ message: 'Access denied.' });
    }
  };
};

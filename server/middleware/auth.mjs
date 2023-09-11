import 'dotenv/config';

export function verifyTokenAndRoles(roles) {
  const jwtSecretKey = process.env.JWT_SECRET;

  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Failed to authenticate token.' });
      }

      // Check if the user has the required role
      if (!roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: 'Access denied. Insufficient role.' });
      }

      // Attach decoded user information to the request object
      req.user = decoded;

      next(); // Continue to the protected route
    });
  };
}

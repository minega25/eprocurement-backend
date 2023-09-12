import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import Users from '../../../db/models/user.js';

const jwtSecretKey = process.env.JWT_SECRET;

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await Users.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (!user.dataValues.isVerified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    // Verify the provided password against the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // User authentication is successful
    const userRole = user.dataValues.role;

    // Generate a JWT token with user information and role
    const token = jwt.sign(
      { email: user.email, role: userRole },
      jwtSecretKey,
      {
        expiresIn: '24h',
      }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

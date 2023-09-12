import express from 'express';
import Users from '../../../db/models/user.js';
import { encryptPassword, generateUniqueToken } from '../../../utils/index.mjs';
import sendMail from '../../../utils/sendMail.mjs';

const router = express.Router();

function generateRandomPassword() {
  var length = 12,
    charset =
      '@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz',
    password = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  return password;
}

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;

    // Check if the username or email already exists
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const randomPassword = generateRandomPassword();

    const hashed = await encryptPassword(randomPassword);

    const subject = 'Activate your E-Proc account';
    const message = `
      Hi there,
      <br />
      Thank you for signing up for E-Proc. Use below temporary password to interact with E-Proc:
      <br />
      <b>${randomPassword}</b>
      <br />
      This password will expire in 24 hours. If you did not sign up for a Render account, you can safely ignore this email.
      Best,
      <br /><br />
      The E-Proc Team
    `;

    await sendMail(email, subject, message);
    // Insert the new user into the database
    const newUser = await Users.create({
      firstName,
      lastName,
      password: hashed,
      email,
      isVerified: true,
      role,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

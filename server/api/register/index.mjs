import express from 'express';
import Users from '../../../db/models/user.js';
import { encryptPassword, generateUniqueToken } from '../../../utils/index.mjs';
import sendMail from '../../../utils/sendmail.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, password, email, role } = req.body;

    // Check if the username or email already exists
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashed = await encryptPassword(password);
    const verificationToken = generateUniqueToken();

    const subject = 'Activate your E-Proc account';
    const message = `
      Hi there,
      <br />
      Thank you for signing up for E-Proc. Use below verification code to verify your email:
      <br />
      <b>${verificationToken}</b>
      <br />
      This link will expire in 24 hours. If you did not sign up for a Render account, you can safely ignore this email.
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
      verificationToken,
      role,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

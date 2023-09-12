import express from 'express';
import sendMail from '../../../utils/sendMail.mjs';
const router = express.Router();

router.post('/', async (req, res) => {
  const { to, message, subject } = req.body;

  try {
    sendMail(to, subject, message);

    return res.json({ message: 'Email notification successful' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

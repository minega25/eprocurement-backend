import express from 'express';
import Users from '../../../db/models/user.js';

const router = express.Router();

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user with the matching verification token
    const user = await Users.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token' });
    }

    // Mark the user as verified and clear the verification token
    await Users.update(
      { isVerified: true, verificationToken: null },
      {
        where: {
          email: user.dataValues.email,
        },
      }
    );

    return res.json({ message: 'Email verification successful' });
  } catch (error) {
    console.error('Error during email verification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

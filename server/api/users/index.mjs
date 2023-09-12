import express from 'express';
import Users from '../../../db/models/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user with the matching verification token
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    // Find the user with the matching verification token
    const users = await Users.findAll();

    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await Users.update(
      { ...data },
      {
        where: {
          id,
        },
      }
    );

    return res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

import express from 'express';
import Tenders from '../../../db/models/tenders.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user with the matching verification token
    const tender = await Tenders.findOne({ where: { id } });

    if (!tender) {
      return res.status(404).json({ message: 'Tender request not found.' });
    }

    return res.json(proc);
  } catch (error) {
    console.error('Error fetching tender:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    // Find the user with the matching verification token
    const tenders = await Tenders.findAll();

    return res.json(tenders);
  } catch (error) {
    console.error('Error fetching tenders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const {
    submission_deadline,
    requirements,
    is_published,
    attachments,
    title,
  } = req.body;
  try {
    // Find the user with the matching verification token
    const newTender = await Tenders.create({
      user_id: req.user.email,
      submission_deadline,
      requirements,
      is_published,
      title,
      attachments,
    });

    return res.json(newTender);
  } catch (error) {
    console.error('Error creating new tender:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const updatedTender = await Tenders.update(
      { ...data },
      {
        where: {
          id,
        },
      }
    );

    return res.json(updatedTender);
  } catch (error) {
    console.error('Error updadting Tender:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

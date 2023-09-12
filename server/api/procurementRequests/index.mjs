import express from 'express';
import Proc from '../../../db/models/procurementrequests.js';
import Users from '../../../db/models/user.js';
import sendMail from '../../../utils/sendMail.mjs';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user with the matching verification token
    const proc = await Proc.findOne({ where: { id } });

    if (!proc) {
      return res
        .status(404)
        .json({ message: 'Procurement request not found.' });
    }

    return res.json(proc);
  } catch (error) {
    console.error('Error fetching proc:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    // Find the user with the matching verification token
    const procs = await Proc.findAll();

    return res.json(procs);
  } catch (error) {
    console.error('Error fetching procs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { items_needed, quantities, budget, preferred_vendor } = req.body;
  console.log(req.user);

  const allStaff = await Users.findAll({ where: { role: 'admin' } });
  const staffEmails = allStaff.map((staff) => {
    return staff.email;
  });

  await sendMail(
    staffEmails,
    'New Procurement Request',
    `A new procurement request has been created. Please review the request and approve or reject it.`
  );
  try {
    // Find the user with the matching verification token
    const newRequest = await Proc.create({
      user_id: req.user.email,
      items_needed,
      quantities,
      budget,
      preferred_vendor,
    });

    return res.json(newRequest);
  } catch (error) {
    console.error('Error creating procs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const updatedRequest = await Proc.update(
      { ...data },
      {
        where: {
          id,
        },
      }
    );

    return res.json(updatedRequest);
  } catch (error) {
    console.error('Error creating procs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

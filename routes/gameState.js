import express from 'express';
import { updateProfitPerHour } from '../services/gameStateService.js';

const router = express.Router();

router.post('/update-profit-per-hour', async (req, res) => {
  const { userId, profitPerHour } = req.body;
  try {
    await updateProfitPerHour(userId, profitPerHour);
    res.status(200).send('Profit per hour updated successfully');
  } catch (error) {
    res.status(500).send('Error updating profit per hour');
  }
});

export default router;

import express from 'express';
import { updateProfitPerHour, fetchGameState, updateGameState } from '../services/gameStateService.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const gameState = await fetchGameState(userId);
    res.status(200).json(gameState);
  } catch (error) {
    res.status(404).json({ message: 'Game state not found' });
  }
});

router.post('/update-profit-per-hour', async (req, res) => {
  const { userId, profitPerHour } = req.body;
  try {
    await updateProfitPerHour(userId, profitPerHour);
    res.status(200).send('Profit per hour updated successfully');
  } catch (error) {
    res.status(500).send('Error updating profit per hour');
  }
});

router.post('/update/:userId', async (req, res) => {
  const { userId } = req.params;
  const gameStateData = req.body;
  try {
    const updatedGameState = await updateGameState(userId, gameStateData);
    res.status(200).json(updatedGameState);
  } catch (error) {
    res.status(500).send('Error updating game state');
  }
});

export default router;

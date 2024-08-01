import express from 'express';
import GameState from '../models/GameState.js';

const router = express.Router();

router.post('/update/:userId', async (req, res) => {
  const { userId } = req.params;
  const gameStateUpdates = req.body;
  try {
    const gameState = await GameState.findOneAndUpdate(
      { userId },
      { $set: gameStateUpdates },
      { new: true, upsert: true }
    );
    res.json(gameState);
  } catch (error) {
    console.error('Error updating game state:', error);
    res.status(500).json({ message: 'Error updating game state' });
  }
});

export default router;

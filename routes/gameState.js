import express from 'express';
import GameState from '../models/GameState.js';

const router = express.Router();

// Update game state
router.post('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const gameState = await GameState.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json(gameState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch game state
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const gameState = await GameState.findOne({ userId });

    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }

    res.status(200).json(gameState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

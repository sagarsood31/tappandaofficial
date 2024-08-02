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

    if (!gameState) {
      console.error(`Game state not found for user: ${userId}`);
      return res.status(404).json({ message: 'Game state not found' });
    }

    res.status(200).json(gameState);
  } catch (error) {
    console.error(`Error updating game state for user ${req.params.userId}:`, error);
    res.status(400).json({ error: error.message });
  }
});

// Fetch game state
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const gameState = await GameState.findOne({ userId });

    if (!gameState) {
      console.error(`Game state not found for user: ${userId}`);
      return res.status(404).json({ message: 'Game state not found' });
    }

    res.status(200).json(gameState);
  } catch (error) {
    console.error(`Error fetching game state for user ${req.params.userId}:`, error);
    res.status(400).json({ error: error.message });
  }
});

// Update profit per hour
router.post('/update-profit-per-hour', async (req, res) => {
  try {
    const { userId, profitPerHour } = req.body;

    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      console.error(`Game state not found for user: ${userId}`);
      return res.status(404).json({ message: 'Game state not found' });
    }

    gameState.profitPerHour = profitPerHour;
    await gameState.save();
    res.status(200).json(gameState);
  } catch (error) {
    console.error(`Error updating profit per hour for user ${req.body.userId}:`, error);
    res.status(400).json({ error: error.message });
  }
});

export default router;

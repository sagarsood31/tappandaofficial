// routes/gameState.js

import express from 'express';
import GameState from '../models/GameState.js';

const router = express.Router();

// Middleware to check and reset boosters
router.use(async (req, res, next) => {
  try {
    const { userId } = req.body;
    const gameState = await GameState.findOne({ userId });
    if (gameState) {
      const now = new Date();
      const sixHoursInMs = 6 * 60 * 60 * 1000;

      // Reset booster counts every 6 hours
      if (now - new Date(gameState.boosterResetTime) >= sixHoursInMs) {
        gameState.boosterCounts = { fillEnergy: 3, energyLimit: 3 };
        gameState.boosterResetTime = now;
      }

      // Reset energy limit back to default after 15 minutes
      const fifteenMinutesInMs = 15 * 60 * 1000;
      if (now - new Date(gameState.energyLimitResetTime) >= fifteenMinutesInMs) {
        gameState.maxPower = gameState.level === 1 ? 4999 : 49999; // Set to default based on level
        gameState.energyLimitResetTime = now;
      }

      await gameState.save();
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

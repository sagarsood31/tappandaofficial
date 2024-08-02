// controller/gameStateController.js

import GameState from '../models/GameState.js';

export const getGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }

    // Refill power before sending the game state
    gameState.refillPower();
    await gameState.save();

    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game state', error });
  }
};

export const updateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameState = await GameState.findOne({ userId });

    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }

    Object.assign(gameState, req.body);

    // Ensure the last refill time is updated correctly
    if (req.body.power !== undefined) {
      gameState.lastRefillTime = Date.now();
    }

    await gameState.save();

    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game state', error });
  }
};

export const resetGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const defaultState = {
      coins: 0,
      earnedCoins: 0,
      level: 1,
      power: 4999,
      maxPower: 4999,
      profitPerMinute: 0,
      profitPerHour: 0,
      uniqueSessions: [],
      boosterCounts: { fillEnergy: 3, energyLimit: 3 },
      exchange: 'BYBIT',
      questLevels: {},
      lockedQuests: {},
      selectedSkin: { name: 'Default', banner: '' },
      purchasedSkins: ['Default', 'CEO'],
      boostUsage: { count: 5, resetTime: Date.now() },
      claimedTasks: [],
      lastUpdated: Date.now(),
      lastRefillTime: Date.now(), // Ensure this is reset
    };
    const gameState = await GameState.findOneAndUpdate({ userId }, defaultState, { new: true, upsert: true });
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error resetting game state', error });
  }
};

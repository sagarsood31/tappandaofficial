// controller/gameStateController.js

import GameState from '../models/GameState.js';

export const getGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game state', error });
  }
};

export const updateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameState = await GameState.findOneAndUpdate({ userId }, req.body, { new: true, upsert: true });
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game state', error });
  }
};

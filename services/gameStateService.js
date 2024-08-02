import GameState from '../models/GameState.js';

export const updateProfitPerHour = async (userId, profitPerHour) => {
  try {
    const gameState = await GameState.findOne({ userId });
    if (gameState) {
      gameState.profitPerHour = profitPerHour;
      gameState.calculateCoins(); // Update coins based on elapsed time
      await gameState.save();
    }
  } catch (error) {
    console.error('Failed to update profit per hour:', error);
  }
};

export const fetchGameState = async (userId) => {
  try {
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      throw new Error('Game state not found');
    }
    return gameState;
  } catch (error) {
    console.error('Error fetching game state:', error);
    throw error;
  }
};

export const updateGameState = async (userId, gameStateData) => {
  try {
    const gameState = await GameState.findOneAndUpdate({ userId }, gameStateData, { new: true });
    if (!gameState) {
      throw new Error('Failed to update game state');
    }
    return gameState;
  } catch (error) {
    console.error('Error updating game state:', error);
    throw error;
  }
};

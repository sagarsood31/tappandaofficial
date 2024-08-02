import GameState from '../models/GameState.js';

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
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      throw new Error('Game state not found');
    }

    // Update game state fields
    Object.assign(gameState, gameStateData);
    gameState.lastUpdated = Date.now();
    await gameState.save();

    return gameState;
  } catch (error) {
    console.error('Error updating game state:', error);
    throw error;
  }
};

export const updateProfitPerHour = async (userId, profitPerHour) => {
  try {
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      throw new Error('Game state not found');
    }

    gameState.profitPerHour = profitPerHour;
    await gameState.save();

    return gameState;
  } catch (error) {
    console.error('Error updating profit per hour:', error);
    throw error;
  }
};

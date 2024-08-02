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
    console.log(`Attempting to update game state for user: ${userId}`);
    console.log('Received game state data:', gameStateData);

    let gameState = await GameState.findOne({ userId });
    if (!gameState) {
      console.error(`Game state not found for user: ${userId}`);
      throw new Error('Game state not found');
    }

    // Update game state fields
    Object.assign(gameState, gameStateData);
    gameState.lastUpdated = Date.now();

    await gameState.save();

    console.log('Game state updated successfully:', gameState);
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

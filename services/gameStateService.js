import GameState from '../models/GameState.js'; // Adjust the path as necessary

// Update the profit per hour for a user
export const updateProfitPerHour = async (userId, profitPerHour) => {
  try {
    const gameState = await GameState.findOne({ userId });
    if (gameState) {
      gameState.profitPerHour = profitPerHour;
      await gameState.save();
    } else {
      console.error(`Game state not found for user: ${userId}`);
      throw new Error('Game state not found');
    }
  } catch (error) {
    console.error('Failed to update profit per hour:', error);
    throw error;
  }
};

import GameState from '../models/GameState.js';

export const updateProfitPerHour = async (userId, profitPerHour) => {
  try {
    const gameState = await GameState.findOne({ userId });
    if (gameState) {
      gameState.profitPerHour = profitPerHour;
      await gameState.save();
    }
  } catch (error) {
    console.error('Failed to update profit per hour:', error);
  }
};

import cron from 'node-cron';
import GameState from './models/GameState.js';

const updateGameStates = async () => {
  try {
    const gameStates = await GameState.find();
    gameStates.forEach(async (gameState) => {
      gameState.calculateCoins();
      await gameState.save();
    });
  } catch (error) {
    console.error('Error updating game states:', error);
  }
};

// Schedule the task to run every hour
cron.schedule('0 * * * *', updateGameStates);

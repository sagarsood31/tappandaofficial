import cron from 'node-cron';
import GameState from './models/GameState.js'; // Adjust the path as necessary

// Function to update coins for all users
const updateCoinsForAllUsers = async () => {
  try {
    const users = await GameState.find({});

    users.forEach(async (user) => {
      const { _id, coins, profitPerHour, lastUpdated } = user;
      const now = Date.now();
      const elapsedSeconds = (now - new Date(lastUpdated).getTime()) / 1000;
      const newCoins = coins + (profitPerHour / 3600) * elapsedSeconds;
      await GameState.findByIdAndUpdate(_id, { coins: newCoins, lastUpdated: now });
    });

    console.log('Coins updated for all users');
  } catch (error) {
    console.error('Error updating coins for all users:', error);
  }
};

// Schedule the task to run every minute
cron.schedule('* * * * *', updateCoinsForAllUsers);

import cron from 'node-cron';
import { updateCoinsPeriodically } from './controllers/gameStateController.js';

// Schedule the coin update task to run every hour
cron.schedule('0 * * * *', () => {
  updateCoinsPeriodically();
});

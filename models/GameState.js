import mongoose from 'mongoose';

const GameStateSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
  earnedCoins: { type: Number, default: 0 }, // Added earnedCoins field
  level: { type: Number, default: 1 },
  power: { type: Number, default: 4999 },
  maxPower: { type: Number, default: 4999 },
  profitPerMinute: { type: Number, default: 0 },
  uniqueSessions: { type: Array, default: [] },
  boosterCounts: { type: Object, default: { fillEnergy: 3, energyLimit: 3 } },
  exchange: { type: String, default: 'BYBIT' },
  questLevels: { type: Object, default: {} }, // Default value added
  lockedQuests: { type: Object, default: {} }, // Default value added
  selectedSkin: { type: Object, default: { name: 'Default', banner: '' } },
  purchasedSkins: { type: Array, default: ['Default', 'CEO'] },
  boostUsage: { type: Object, default: { count: 5, resetTime: Date.now() } },
  claimedTasks: { type: Array, default: [] }, // Added claimedTasks field
});

export default mongoose.model('GameState', GameStateSchema);

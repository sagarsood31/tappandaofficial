import mongoose from 'mongoose';

const GameStateSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
  earnedCoins: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  power: { type: Number, default: 4999 },
  maxPower: { type: Number, default: 4999 },
  profitPerMinute: { type: Number, default: 0 },
  profitPerHour: { type: Number, default: 0 }, // New field
  uniqueSessions: { type: Array, default: [] },
  boosterCounts: { type: Object, default: { fillEnergy: 3, energyLimit: 3 } },
  exchange: { type: String, default: 'BYBIT' },
  questLevels: { type: Object, default: {} },
  lockedQuests: { type: Object, default: {} },
  selectedSkin: { type: Object, default: { name: 'Default', banner: '' } },
  purchasedSkins: { type: Array, default: ['Default', 'CEO'] },
  boostUsage: { type: Object, default: { count: 5, resetTime: Date.now() } },
  claimedTasks: { type: Array, default: [] },
  lastUpdated: { type: Date, default: Date.now },
  lastRefillTime: { type: Date, default: Date.now }, // New field
});

GameStateSchema.methods.calculateCoins = function() {
  const now = Date.now();
  const elapsedMinutes = (now - this.lastUpdated) / 60000;
  this.coins += this.profitPerMinute * elapsedMinutes;
  this.lastUpdated = now;
};

GameStateSchema.methods.refillPower = function() {
  const now = Date.now();
  const elapsedTime = (now - this.lastRefillTime) / 1000; // in seconds
  const powerToRefill = Math.floor(elapsedTime); // 1 power per second
  this.power = Math.min(this.power + powerToRefill, this.maxPower);
  this.lastRefillTime = now;
};

export default mongoose.model('GameState', GameStateSchema);

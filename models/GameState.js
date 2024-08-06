import mongoose from 'mongoose';

const GameStateSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
  earnedCoins: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  power: { type: Number, default: 4999 },
  maxPower: { type: Number, default: 4999 },
  profitPerMinute: { type: Number, default: 0 },
  profitPerHour: { type: Number, default: 0 },
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
  lastRefillTime: { type: Date, default: Date.now },
});

GameStateSchema.methods.calculateCoins = function() {
  const now = Date.now();
  const elapsedSeconds = (now - this.lastUpdated) / 1000;
  const coinsToAdd = (this.profitPerHour / 3600) * elapsedSeconds;
  this.coins += coinsToAdd;
  this.lastUpdated = now;
};

GameStateSchema.methods.refillPower = function() {
  const now = Date.now();
  const elapsedTime = (now - this.lastRefillTime) / 1000;
  const powerToRefill = Math.floor(elapsedTime);
  this.power = Math.min(this.power + powerToRefill, this.maxPower);
  this.lastRefillTime = now;
};

export default mongoose.model('GameState', GameStateSchema);

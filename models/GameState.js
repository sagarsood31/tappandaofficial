import mongoose from 'mongoose';

const GameStateSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
  telegramFullName: { type: String, default: '' },
  telegramUsername: { type: String, default: '' },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model('GameState', GameStateSchema);

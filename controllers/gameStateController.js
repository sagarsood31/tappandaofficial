import GameState from '../models/GameState.js';

export const getGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }

    gameState.refillPower();
    gameState.calculateCoins();
    await gameState.save();

    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game state', error });
  }
};

export const updateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameState = await GameState.findOne({ userId });

    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }

    Object.assign(gameState, req.body);

    if (req.body.power !== undefined) {
      gameState.lastRefillTime = Date.now();
    }

    await gameState.save();

    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game state', error });
  }
};

export const resetGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const defaultState = {
      coins: 0,
      earnedCoins: 0,
      level: 1,
      power: 4999,
      maxPower: 4999,
      profitPerMinute: 0,
      profitPerHour: 0,
      uniqueSessions: [],
      boosterCounts: { fillEnergy: 3, energyLimit: 3 },
      exchange: 'BYBIT',
      questLevels: {},
      lockedQuests: {},
      selectedSkin: { name: 'Default', banner: '' },
      purchasedSkins: ['Default', 'CEO'],
      boostUsage: { count: 5, resetTime: Date.now() },
      claimedTasks: [],
      lastUpdated: Date.now(),
      lastRefillTime: Date.now(),
    };
    const gameState = await GameState.findOneAndUpdate({ userId }, defaultState, { new: true, upsert: true });
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error resetting game state', error });
  }
};

export const updateProfitPerHour = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profitPerHour } = req.body;
    const gameState = await GameState.findOneAndUpdate(
      { userId },
      { profitPerHour },
      { new: true }
    );
    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profit per hour', error });
  }
};

export const updateCoinsPeriodically = async () => {
  try {
    const gameStates = await GameState.find({});
    const now = Date.now();

    for (const gameState of gameStates) {
      const elapsedSeconds = (now - gameState.lastUpdated) / 1000;
      const coinsToAdd = (gameState.profitPerHour / 3600) * elapsedSeconds;
      gameState.coins += coinsToAdd;
      gameState.lastUpdated = now;

      await gameState.save();
    }
  } catch (error) {
    console.error('Error updating coins periodically:', error);
  }
};

export const verifyInvite = async (req, res) => {
  try {
    const { sessionId } = req.body;
    // Assuming you have a logic to verify the invite using sessionId
    const isVerified = true; // Replace with actual verification logic

    if (!isVerified) {
      return res.status(400).json({ success: false, message: 'Verification failed' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying invite', error });
  }
};

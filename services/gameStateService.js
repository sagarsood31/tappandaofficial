import GameState from '../models/GameState.js';

// Function to fetch or create a game state for a user
export const fetchOrCreateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    let gameState = await GameState.findOne({ userId });

    if (!gameState) {
      // Create a new game state if none exists
      gameState = new GameState({ userId });
      await gameState.save();
    }

    res.status(200).json(gameState);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or create game state' });
  }
};

// Function to update the game state
export const updateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    const gameStateData = req.body;

    let gameState = await GameState.findOneAndUpdate({ userId }, gameStateData, { new: true });

    res.status(200).json(gameState);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game state' });
  }
};

// Function to periodically update coins based on profit per hour
export const updateCoinsPeriodically = async () => {
  try {
    const gameStates = await GameState.find();

    gameStates.forEach(async (gameState) => {
      const now = Date.now();
      const elapsedHours = (now - gameState.lastUpdated) / (1000 * 60 * 60);
      gameState.coins += gameState.profitPerHour * elapsedHours;
      gameState.lastUpdated = now;

      await gameState.save();
    });
  } catch (error) {
    console.error('Failed to update coins periodically:', error);
  }
};

import GameState from '../models/GameState.js';

export const getGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching game state for userId:', userId); // Added logging
    const gameState = await GameState.findOne({ userId });
    if (!gameState) {
      console.log('Game state not found for userId:', userId); // Added logging
      return res.status(404).json({ message: 'Game state not found' });
    }

    res.json(gameState);
  } catch (error) {
    console.error('Error fetching game state:', error); // Added logging
    res.status(500).json({ message: 'Error fetching game state', error });
  }
};

export const updateGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Updating game state for userId:', userId); // Added logging
    const gameState = await GameState.findOne({ userId });

    if (!gameState) {
      console.log('Game state not found for userId:', userId); // Added logging
      return res.status(404).json({ message: 'Game state not found' });
    }

    Object.assign(gameState, req.body);

    await gameState.save();

    res.json(gameState);
  } catch (error) {
    console.error('Error updating game state:', error); // Added logging
    res.status(500).json({ message: 'Error updating game state', error });
  }
};

export const resetGameState = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Resetting game state for userId:', userId); // Added logging
    const defaultState = {
      coins: 0,
      telegramFullName: '',
      telegramUsername: '',
      lastUpdated: Date.now(),
    };
    const gameState = await GameState.findOneAndUpdate({ userId }, defaultState, { new: true, upsert: true });
    res.json(gameState);
  } catch (error) {
    console.error('Error resetting game state:', error); // Added logging
    res.status(500).json({ message: 'Error resetting game state', error });
  }
};

export const updateProfitPerHour = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profitPerHour } = req.body;
    console.log('Updating profit per hour for userId:', userId); // Added logging
    const gameState = await GameState.findOneAndUpdate(
      { userId },
      { profitPerHour },
      { new: true }
    );
    if (!gameState) {
      console.log('Game state not found for userId:', userId); // Added logging
      return res.status(404).json({ message: 'Game state not found' });
    }
    res.json(gameState);
  } catch (error) {
    console.error('Error updating profit per hour:', error); // Added logging
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
    console.error('Error updating coins periodically:', error); // Added logging
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
    console.error('Error verifying invite:', error); // Added logging
    res.status(500).json({ message: 'Error verifying invite', error });
  }
};

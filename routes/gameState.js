// routes/gameState.js

import express from 'express';
import { getGameState, updateGameState, resetGameState } from '../controllers/gameStateController.js';

const router = express.Router();

router.get('/:userId', getGameState);
router.post('/update/:userId', updateGameState);
router.post('/reset/:userId', resetGameState);

export default router;

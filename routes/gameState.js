// routes/gameState.js

import express from 'express';
import { getGameState, updateGameState, resetGameState, verifyInvite } from '../controller/gameStateController.js';

const router = express.Router();

router.get('/:userId', getGameState);
router.post('/update/:userId', updateGameState);
router.post('/reset/:userId', resetGameState);
router.post('/verify-invite', verifyInvite);

export default router;

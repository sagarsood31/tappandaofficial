import express from 'express';
import {
  getGameState,
  updateGameState,
  resetGameState,
  updateProfitPerHour,
  verifyInvite,
} from '../controllers/gameStateController.js';

const router = express.Router();

router.get('/:userId', getGameState);
router.post('/update/:userId', updateGameState);
router.post('/reset/:userId', resetGameState);
router.post('/verify-invite', verifyInvite);
router.post('/update-profit-per-hour/:userId', updateProfitPerHour);

export default router;

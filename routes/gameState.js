import express from 'express';
import {
  getGameState,
  updateGameState,
  resetGameState,
  updateProfitPerHour,
  verifyInvite
} from '../controllers/gameStateController.js';

const router = express.Router();

router.get('/:userId', getGameState);
router.post('/update/:userId', updateGameState);
router.post('/reset/:userId', resetGameState);
router.post('/update-profit/:userId', updateProfitPerHour);
router.post('/verify-invite', verifyInvite);

export default router;

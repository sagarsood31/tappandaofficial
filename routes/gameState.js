import express from 'express';
import { getGameState, updateGameState } from '../controllers/gameStateController.js';

const router = express.Router();

router.get('/:userId', getGameState);
router.post('/update/:userId', updateGameState);

export default router;

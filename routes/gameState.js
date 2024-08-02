import express from 'express';
import { fetchOrCreateGameState, updateGameState } from '../controllers/gameStateController.js';

const router = express.Router();

router.get('/:userId', fetchOrCreateGameState);
router.post('/update/:userId', updateGameState);

export default router;

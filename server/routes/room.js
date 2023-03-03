import { Router } from 'express';
import { createRoom } from '../controllers/room.js';
import cekUserId from '../middleware/cekUserId.js';
const router = Router();

router.post('/create/:userId', cekUserId, createRoom);

export default router;

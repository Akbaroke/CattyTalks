import { Router } from 'express';
import { createRoom, deleteRoom, getRoom } from '../controllers/room.js';
import cekUserId from '../middleware/cekUserId.js';
const router = Router();

router.post('/create/:userId', cekUserId, createRoom);
router.get('/:userId', cekUserId, getRoom);
router.delete('/', deleteRoom);

export default router;

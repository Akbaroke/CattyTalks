import { Router } from 'express';
import { checkDuplicateRoom, createRoom, deleteRoom, getRoom } from '../controllers/room.js';
import cekUserId from '../middleware/cekUserId.js';
const router = Router();

router.post('/create/:userId', cekUserId, createRoom);
router.get('/:userId', cekUserId, getRoom);
router.delete('/', deleteRoom);
router.get('/check/:userId', cekUserId, checkDuplicateRoom);

export default router;

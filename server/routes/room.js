import { Router } from 'express';
import { checkDuplicateRoom, checkRoomForJoin, createRoom, deleteRoom, getRoom, getRoomJoin, joinRoom } from '../controllers/room.js';
import cekUserId from '../middleware/cekUserId.js';
const router = Router();

router.delete('/', deleteRoom);
router.get('/:userId', cekUserId, getRoom);
router.post('/check/:userId', cekUserId, checkDuplicateRoom);
router.post('/create/:userId', cekUserId, createRoom);
router.get(`/check/:userId/:code`, cekUserId, checkRoomForJoin);
router.post(`/join/:userId`, cekUserId, joinRoom);
router.get(`/join/:userId`, cekUserId, getRoomJoin);


export default router;

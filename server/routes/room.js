import { Router } from 'express';
import { checkDuplicateRoom, checkRoomForJoin, checkStatusRoom, createRoom, deleteJoin, deleteRoom, getRoom, getRoomJoin, joinRoom } from '../controllers/room.js';
import cekUserId from '../middleware/cekUserId.js';
const router = Router();

router.delete('/', deleteRoom);
router.get('/:userId', cekUserId, getRoom);
router.get('/status/:code', checkStatusRoom);
router.post('/check/:userId', cekUserId, checkDuplicateRoom);
router.post('/create/:userId', cekUserId, createRoom);
router.get(`/check/:userId/:code`, cekUserId, checkRoomForJoin);
router.post(`/join/:userId`, cekUserId, joinRoom);
router.get(`/join/:userId`, cekUserId, getRoomJoin);
router.delete(`/join/:userId/:code`, cekUserId, deleteJoin);


export default router;

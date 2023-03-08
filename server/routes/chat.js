import { Router } from 'express';
import cekUserId from '../middleware/cekUserId.js';
import { addMessage, deleteMessage, getAllMessages } from '../controllers/chat.js';
const router = Router();

router.get('/:userId/:room', cekUserId, getAllMessages);
router.post('/:userId', cekUserId, addMessage);
router.put('/:userId', cekUserId, deleteMessage);

export default router;

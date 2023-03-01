import { Router } from 'express';
import { AuthGoogle, getDataGoogle, loginFailed, loginSuccess, logoutGoogle } from '../controllers/auth.js';

const router = Router();

router.get('/login/success', loginSuccess);
router.get('/login/failed', loginFailed);
router.get('/google', getDataGoogle);
router.get('/google/callback', AuthGoogle);
router.get('/logout', logoutGoogle);

export default router;

import { Router } from 'express';
import { login, register, verifyToken } from '../controllers/admin.controller.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verifyToken', verifyToken);

export default router;
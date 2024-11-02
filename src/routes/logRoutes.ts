import { Router } from 'express';
import { addReadLog } from '../controllers/logController';

const router = Router();

router.post('/', addReadLog);

export default router;

import { Router } from 'express';
import teachersRouter from './teachers.js';
// import authRouter from './auth.js';

const router = Router();

router.use('/teachers', teachersRouter);
// router.use('/auth', authRouter);

export default router;

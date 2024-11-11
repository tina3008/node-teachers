import { Router } from 'express';
import teachersRouter from './teachers.js';
import usersRouter from './users.js';

const router = Router();

router.use('/teachers', teachersRouter);
router.use('/users', usersRouter);

export default router;

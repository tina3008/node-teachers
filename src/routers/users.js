import { Router } from 'express';
import {
  regUser, loginUser,
  logoutUser,
  addTeacherToUser,
} from '../controllers/users.js';


const router = Router();

router.post('/register', regUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/addteacher', addTeacherToUser);

export default router;

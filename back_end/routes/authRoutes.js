import express from 'express';
import {
  registerUser,
  loginUser,
  loginAdmin,
  loginStudent,
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);
router.post('/login/admin', loginAdmin);
router.post('/login/user', loginStudent);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, upload.single('photo'), updateUserProfile);

export default router;

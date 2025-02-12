import express from 'express';
import { UserController } from '../controllers/user.controller';
import { handleImage } from '../config/upload-file';
import UserMiddleware from '../middleware/user.middleware';

const router = express.Router();
// router.get('/', UserController.getUsers);
router.post('/', handleImage, UserController.createUser);
router.post('/login', UserController.loginUser);
router.delete('/logout', UserMiddleware.verifyToken, UserController.logoutUser);

export default router;
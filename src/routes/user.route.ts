import express from 'express';
import { UserController } from '../controllers/user.controller';
import { handleImage } from '../config/upload-file';

const router = express.Router();
// router.get('/', UserController.getUsers);
router.post('/', handleImage, UserController.createUser);

export default router;
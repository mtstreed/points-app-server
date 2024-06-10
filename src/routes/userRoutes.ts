import express from 'express';
import {getAllUsers, getUserById, updateUser, createUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/:id', updateUser);
router.post('/', createUser);

export default router;

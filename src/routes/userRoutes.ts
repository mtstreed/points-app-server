import express from 'express';
import {getAllUsers, getUserById, updateUser, createUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/:id', updateUser);

export default router;

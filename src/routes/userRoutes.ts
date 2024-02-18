import express from 'express';
import {getAllUsers, getUserById, updateUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', updateUsers);

export default router;

import express from 'express';
import router from express.Router();
import { getUsers } from '../controllers/userController';

// GET /api/todos
router.get('/', getUsers);

export default router;

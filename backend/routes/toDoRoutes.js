import express from 'express';
const router = express.Router();
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/toDoController.js';

// GET /api/todos
router.route('/').get(getTodos).post(addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;

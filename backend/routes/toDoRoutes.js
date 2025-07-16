import express from 'express';
const router = express.Router();
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/toDoController.js';

// GET /api/todos
router.get('/', getTodos);
router.get('/a', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;

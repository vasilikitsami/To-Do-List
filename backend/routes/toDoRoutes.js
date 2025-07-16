import express from 'express';
import router from express.Router();
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/toDoController';

// GET /api/todos
router.get('/', getTodos);
router.get('/a', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;

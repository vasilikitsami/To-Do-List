const express = require('express');
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/toDoController');

// GET /api/todos
router.get('/', getTodos);
router.get('/a', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);


module.exports = router;

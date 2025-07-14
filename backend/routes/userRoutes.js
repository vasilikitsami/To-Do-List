const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// GET /api/todos
router.get('/', getUsers);

module.exports = router;

const express = require('express');
const router = express.Router();
const { saveResults, getResults } = require('../controllers/resultsController');

router.post('/', saveResults);
router.get('/', getResults);    

module.exports = router;
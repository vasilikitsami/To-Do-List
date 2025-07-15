const express = require('express');
//create a router object to define the routes for preferences
const router = express.Router();
const { getPreferences, updatePreferences } = require('../controllers/preferencesController');

router.get('/', getPreferences);
router.put('/', updatePreferences);

module.exports = router;
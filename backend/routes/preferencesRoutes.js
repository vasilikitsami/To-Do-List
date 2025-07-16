import express from 'express';
import { getPreferences, updatePreferences } from '../controllers/preferencesController';

//create a router object to define the routes for preferences
const router = express.Router();

router.get('/', getPreferences);
router.put('/', updatePreferences);

export default router;
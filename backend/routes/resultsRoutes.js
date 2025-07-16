import express from 'express';
const router = express.Router();
import { saveResults, getResults } from '../controllers/resultsController.js';

router.post('/', saveResults);
router.get('/', getResults);    

export default router;
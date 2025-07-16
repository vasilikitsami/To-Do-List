import express from 'express';
import router from express.Router();
import { saveResults, getResults } from '../controllers/resultsController';

router.post('/', saveResults);
router.get('/', getResults);    

export default router;
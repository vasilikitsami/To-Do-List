import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config();

import toDoRoutes from './routes/toDoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import preferencesRoutes from './routes/preferencesRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';
import connectDB from './config/mongo-db.js';

connectDB();


import cors from 'cors';
const PORT = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api/todos', toDoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/results', resultsRoutes);


app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`));

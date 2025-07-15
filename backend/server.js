const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const toDoRoutes = require('./routes/toDoRoutes');
const userRoutes = require('./routes/userRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');
const resultsRoutes = require('./routes/resultsRoutes');

const cors = require('cors');
const PORT = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api/todos', toDoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/results', resultsRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => 
        console.log(`Server running on http://localhost:${PORT}`));
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });


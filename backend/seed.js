const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Todo = require('./models/Todo');

dotenv.config();

mongoose.connect(process.env.MONGO_URI) 

    // Connect to MongoDB using the URI from .env file
    .then(async () => {
        console.log('Connected to MongoDB. Seeding...');

        await Todo.deleteMany({}); // Clear existing todos
        
        // Seed data
        const todos = [
            { task: 'Learn Node.js', completed: false },
            { task: 'Build a To-Do App', completed: false },
            { task: 'Deploy the App', completed: false }
        ];

        // Insert seed data into the database Todo
        await Todo.insertMany(todos);
        console.log('Seed data inserted');
        process.exit();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit();
    })
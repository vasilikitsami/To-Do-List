const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    sortMethod: String,
    searchTerm: String,
    results: [
        {
            task: String,
            completed: Boolean,
            createdAt: Date
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Results', resultsSchema);
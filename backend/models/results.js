import mongoose from'mongoose';

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

export default mongoose.model('Results', resultsSchema);
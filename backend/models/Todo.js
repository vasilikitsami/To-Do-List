import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// Enforce uniqueness
todoSchema.index({ user_id: 1, task: 1 }, { unique: true });

export default mongoose.model("Todo", todoSchema);

//Results Schema
const resultsSchema = new mongoose.Schema(
  {
    sortMethod: String,
    searchTerm: String,
    results: [
      {
        task: String,
        completed: Boolean,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export const Results = mongoose.model("Results", resultsSchema);

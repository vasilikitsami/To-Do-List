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
});

export default mongoose.model("Todo", todoSchema);

const preferencesSchema = new mongoose.Schema(
  {
    sortMethod: {
      type: String,
      default: "default",
    },
    searchTerm: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Preferences = mongoose.model("Preferences", preferencesSchema);

// ===== Results Schema =====
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

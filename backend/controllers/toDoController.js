import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("Fetched todos:", todos);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Failed to add todo" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

export const getPreferences = async (req, res) => {
  const preferences = await Preferences.findOne();
  if (!preferences) {
    return res.json(await Preferences.findOne());
  }
  res.json(preferences);
};

export const updatePreferences = async (req, res) => {
  const { sortMethod, searchTerm } = req.body;
  const preferences = await Preferences.findOne();
  if (preferences) {
    preferences.sortMethod = sortMethod;
    preferences.searchTerm = searchTerm;
    await preferences.save();
    return res.json(preferences);
  } else {
    const newPreferences = new Preferences({ sortMethod, searchTerm });
    return res.json(newPreferences);
  }
};

// Results Controllers
export const saveResults = async (req, res) => {
  const { sortMethod, searchTerm, results } = req.body;
  try {
    const savedResults = await Results.create({
      sortMethod,
      searchTerm,
      results,
    });
    res.status(201).json(savedResults);
  } catch (err) {
    res.status(500).json({ error: "Failed to save results" });
  }
};

export const getResults = async (req, res) => {
  const all = await Results.find().sort({ createdAt: -1 });
  res.json(all);
};

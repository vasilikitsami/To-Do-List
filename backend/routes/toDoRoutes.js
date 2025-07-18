import express from "express";
const router = express.Router();
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getPreferences,
  updatePreferences,
  getResults,
  saveResults,
} from "../controllers/toDoController.js";

// GET /api/todos
router.route("/").get(getTodos).post(addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

router.route("/preferences").get(getPreferences).put(updatePreferences);

router.route("/results").get(getResults).post(saveResults);

export default router;

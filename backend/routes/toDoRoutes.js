import express from "express";
import requireAuth from "../middleware/requireAuth.js"; // ✅ correct

const router = express.Router();
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getResults,
  saveResults,
} from "../controllers/toDoController.js";

//require auth for all routes
router.use(requireAuth);

// GET /api/todos
router.route("/").get(getTodos).post(addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

router.route("/results").get(getResults).post(saveResults);

export default router;

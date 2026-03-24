import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

// Create Task
router.post("/", protect, authorize("ADMIN", "PM"), createTask);

// Get Tasks by Project
router.get("/:projectId", protect, getTasks);

// Update Task
router.put("/:id", protect, updateTask);

// Delete Task
router.delete("/:id", protect, deleteTask);

export default router;
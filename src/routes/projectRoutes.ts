import express from "express";
import { createProject } from "../controllers/projectController";
import { createProjectValidator } from "../validators/projectValidator";
import { validate } from "../middleware/validationMiddleware";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["ADMIN", "PM"]),
  createProjectValidator,
  validate,
  createProject
);

export default router;
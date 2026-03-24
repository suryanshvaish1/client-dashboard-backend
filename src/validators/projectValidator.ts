
import { body } from "express-validator";

export const createProjectValidator = [
  body("name").notEmpty().withMessage("Project name is required")
];
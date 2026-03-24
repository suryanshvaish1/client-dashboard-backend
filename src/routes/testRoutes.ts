import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

//  Only ADMIN can access
router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Welcome Admin " });
});

//  PM + ADMIN
router.get("/pm", protect, authorize("ADMIN", "PM"), (req, res) => {
  res.json({ message: "Welcome PM " });
});

//  All logged users
router.get("/all", protect, (req, res) => {
  res.json({ message: "Welcome Logged User " });
});

export default router;
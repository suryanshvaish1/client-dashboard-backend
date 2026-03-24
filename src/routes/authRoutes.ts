import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, role } = req.body;

  // dummy user (for task)
  const user = { id: 1, email, role };

  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json({ token });
});

export default router;
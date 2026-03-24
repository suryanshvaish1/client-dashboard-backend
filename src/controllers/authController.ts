import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false
  });

  res.json({ accessToken });
};
import { Request, Response } from "express";
import prisma from "../config/prisma";
import { getIO } from "../sockets";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await prisma.task.update({
  where: { id: req.params.id as string },
  data: req.body,
});
    const io = getIO();
    io.emit("taskUpdated", updatedTask);

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message
    });
  }
};
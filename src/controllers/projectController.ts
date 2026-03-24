import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";


// ✅ CREATE PROJECT
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const project = await prisma.project.create({
      data: {
        name,
        createdBy: {
          connect: { id: req.user!.id }
        }
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating project" });
  }
};



// ✅ GET ALL PROJECTS
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    let projects;

    if (req.user!.role === "ADMIN") {
      projects = await prisma.project.findMany({
        include: { createdBy: true }
      });
    } else {
      projects = await prisma.project.findMany({
        where: { createdById: req.user!.id }
      });
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};



// ✅ GET PROJECT BY ID
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }; // 🔥 FIX

    const project = await prisma.project.findUnique({
      where: { id },
      include: { createdBy: true }
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching project" });
  }
};



// ✅ UPDATE PROJECT
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }; // 🔥 FIX
    const { name } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: { name }
    });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project" });
  }
};



// ✅ DELETE PROJECT
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }; // 🔥 FIX

    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project" });
  }
};
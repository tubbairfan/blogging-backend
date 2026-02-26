import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getUsers = async (_: Request, res: Response) =>  {
  try {
    const users = await prisma.user.findMany({ where: { role: { not: "ADMIN" } } });
    return res.json(users);
  } catch {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

  
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const userId = Number(id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    if (existingUser.role === "ADMIN") {
      return res.status(403).json({ message: "Admin account cannot be modified from this endpoint" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    return res.json({ message: "User updated", updatedUser });
  } catch {
    return res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "ADMIN") {
      return res.status(403).json({ message: "Admin account cannot be deleted" });
    }

    await prisma.user.delete({ where: { id: userId } });
    return res.json({ message: "User deleted" });
  } catch {
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

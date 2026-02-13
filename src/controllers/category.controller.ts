import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { CategoryErrors } from "../validators/categoryErrors";
import slugify from "slugify";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    
    const newCategory = await prisma.category.create({
      data: { title, description, slug,  status },
    });

    res.status(201).json({
      message: CategoryErrors.CREATED,
      category: newCategory,
    });
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    res.status(500).json({ message: CategoryErrors.SERVER_ERROR });
  }
};

// Get Categories

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(categories);
  } catch (error: any) {
    console.error("GET CATEGORIES ERROR:", error);
    res.status(500).json({ message: CategoryErrors.SERVER_ERROR });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);
    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        articles: true,
        _count: { select: { articles: true } },
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("GET CATEGORY BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(404).json({ message: CategoryErrors.NOT_FOUND });
    }

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { title, description, status },
    });

    res.status(200).json({
      message: CategoryErrors.UPDATED,
      category: updated,
    });
  } catch (error) {
    res.status(500).json({ message: CategoryErrors.SERVER_ERROR });
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(404).json({ message: CategoryErrors.NOT_FOUND });
    }

    const deleted = await prisma.category.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: CategoryErrors.DELETED,
      category: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: CategoryErrors.SERVER_ERROR });
  }
};

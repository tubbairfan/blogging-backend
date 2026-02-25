import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { CategoryErrors } from "../../utils/categoryErrors";
import slugify from "slugify";

const getImageUrl = (req: Request) => {
  if (!req.file) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
};

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const imageUrl = getImageUrl(req);

    const newCategory = await prisma.category.create({
      data: { title, description, slug, status, image: imageUrl },
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

    const imageUrl = getImageUrl(req);

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        ...(imageUrl ? { image: imageUrl } : {}),
      },
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
    const categoryId = Number(id);
    const forceDelete = String(req.query.force || "").toLowerCase() === "true";

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ message: CategoryErrors.NOT_FOUND });
    }

    const relatedArticles = category._count.articles;
    if (relatedArticles > 0 && !forceDelete) {
      return res.status(409).json({
        message: `This category has ${relatedArticles} related article(s). Deleting it will also delete those articles.`,
        requiresConfirmation: true,
        articleCount: relatedArticles,
      });
    }

    const [deletedArticles, deletedCategory] = await prisma.$transaction([
      prisma.article.deleteMany({ where: { categoryId } }),
      prisma.category.delete({ where: { id: categoryId } }),
    ]);

    res.status(200).json({
      message: CategoryErrors.DELETED,
      category: deletedCategory,
      deletedArticles: deletedArticles.count,
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    res.status(500).json({ message: CategoryErrors.SERVER_ERROR });
  }
};

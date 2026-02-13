import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Create Article
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { name, description, categoryName, status } = req.body;

    if (!name || !categoryName) {
      return res.status(400).json({
        message: "Name and Category are required",
      });
    }

    const category = await prisma.category.findFirst({
      where: { title: categoryName },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const article = await prisma.article.create({
      data: {
        name,
        description,
        status: status || "active",
        categoryId: category.id,
      },
      include: { category: true },
    });

    res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        category: {
          select: { title: true }, 
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(articles);
  } catch (error: any) {
    console.error("GET ARTICLES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, categoryName, status } = req.body;

    const existing = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Article not found" });
    }

    let categoryId = existing.categoryId;

    if (categoryName) {
      const category = await prisma.category.findFirst({
        where: { title: categoryName },
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      categoryId = category.id;
    }

    const updated = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        status,
        categoryId,
      },
      include: { category: true },
    });

    res.status(200).json({
      message: "Article updated successfully",
      article: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Article not found" });
    }

    await prisma.article.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


import express from "express";
import { createCategory, updateCategory, getCategories, deleteCategory } from "../controllers/category.controller";
import { createCategorySchema, updateCategorySchema } from "../Errors/categorySchema";
import { validateBody } from "../middlewares/validation";

const router = express.Router();

router.post("/", validateBody(createCategorySchema), createCategory);
router.get("/", getCategories);
router.put("/:id", validateBody(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;

import express from "express";
import upload from "../middlewares/upload";
import { createCategory, updateCategory, getCategories, deleteCategory, getCategoryById } from "../controllers/category.controller";
import { validateBody } from "../middlewares/validation";
import { createCategorySchema } from "../validators/categorySchema";

const router = express.Router();

router.post("/", upload.single("image"), validateBody(createCategorySchema), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;

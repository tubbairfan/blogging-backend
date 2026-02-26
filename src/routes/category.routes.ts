import express from "express";
import upload from "../middlewares/upload.js";
import { createCategory, updateCategory, getCategories, deleteCategory, getCategoryById } from "../controllers/category.controller.js";
import { validateBody } from "../middlewares/validation.js";
import { createCategorySchema } from "../validators/categorySchema.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.single("image"), validateBody(createCategorySchema), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", verifyAdmin, upload.single("image"), updateCategory);
router.delete("/:id", verifyAdmin, deleteCategory);

export default router;

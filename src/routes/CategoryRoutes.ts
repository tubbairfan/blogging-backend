
import express from "express";
import { createCategory, updateCategory, getCategories, deleteCategory ,getCategoryById} from "../controllers/category.controller";
import { validateBody } from "../middlewares/validation";
import { createCategorySchema } from "../validators/categorySchema";

const router = express.Router();

router.post("/",validateBody(createCategorySchema), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id",  updateCategory);
router.delete("/:id", deleteCategory);

export default router;

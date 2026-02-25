import express from "express";
import {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  getSingleArticle
} from "../controllers/article.controller";
import { validateBody } from "../middlewares/validation";
import { createArticleSchema } from "../validators/article.schema";
import upload from "../middlewares/upload";
import { verifyAdmin } from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyAdmin, upload.single("image"), validateBody(createArticleSchema), createArticle);
router.get("/", getArticles);
router.get("/:id", getSingleArticle);
router.put("/:id", verifyAdmin, upload.single("image"), updateArticle);
router.delete("/:id", verifyAdmin, deleteArticle);

export default router;

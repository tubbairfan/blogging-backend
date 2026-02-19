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

const router = express.Router();

router.post("/", upload.single("image"), validateBody(createArticleSchema), createArticle);
router.get("/", getArticles);
router.get("/:id", getSingleArticle);
router.put("/:id", upload.single("image"), updateArticle);
router.delete("/:id", deleteArticle);

export default router;

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


const router = express.Router();

router.post("/", validateBody(createArticleSchema), createArticle);       
router.get("/", getArticles);   
router.get("/:id", getSingleArticle);       
router.put("/:id", updateArticle);     
router.delete("/:id", deleteArticle);  

export default router;

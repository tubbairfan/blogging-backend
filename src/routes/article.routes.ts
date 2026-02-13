import express from "express";
import {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller";

const router = express.Router();

router.post("/", createArticle);       
router.get("/", getArticles);          
router.put("/:id", updateArticle);     
router.delete("/:id", deleteArticle);  

export default router;

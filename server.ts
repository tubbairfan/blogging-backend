import express from "express";
import cors from "cors";
import path from "path";
import categoryRoutes from "./src/routes/category.routes";
import articleRoutes from "./src/routes/article.routes";
const app = express();

const allowedOrigins = [
  "http://localhost:3001"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

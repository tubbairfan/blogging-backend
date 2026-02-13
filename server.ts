import express from "express";
import categoryRoutes from "./src/routes/CategoryRoutes";
import articleRoutes from "./src/routes/article.routes";
const app = express();
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

import express from "express";
import cors from "cors";
import categoryRoutes from "./src/routes/CategoryRoutes";
import articleRoutes from "./src/routes/article.routes";
const app = express();

const allowedOrigins = [
  "http://localhost:3001"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

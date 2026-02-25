import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import categoryRoutes from "./src/routes/category.routes";
import articleRoutes from "./src/routes/article.routes";
import adminRoutes from "./src/routes/admin.routes";
import userRoutes from "./src/routes/user.routes";
const app = express();

const allowedOrigins = [
  "http://localhost:3001"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

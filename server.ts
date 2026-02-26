import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import categoryRoutes from "./src/routes/category.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import userRoutes from "./src/routes/user.routes.js";
const app = express();

const allowedOrigins = [
  "https://blogging-one-sigma.vercel.app"
];

app.use(
  cors({
    origin: "https://blogging-one-sigma.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

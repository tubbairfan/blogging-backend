import { z } from "zod";
import { statusSchema } from "./common.schema";

export const createCategorySchema = z.object({
  title: z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z.string().trim().min(1, "Title is required")
  ),

  description: z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z.string().trim().min(1, "Description is required")
  ),

  status: statusSchema,
});

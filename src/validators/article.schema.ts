import { z } from "zod";
import { statusSchema } from "./common.schema";

export const createArticleSchema = z.object({
  name: z
    .string({ message: "Invalid" })
    .min(1, "Name is required")
    .trim(),

  description: z
    .string({ message: "Inavalid" })
    .min(1, "Description is required")
    .trim(),

  categoryName: z
    .string({ message: "CategoryName is required" })
    .min(1, "Category is required")
    .trim(),

  status: statusSchema,
});


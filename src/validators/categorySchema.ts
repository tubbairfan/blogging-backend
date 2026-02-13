import { z } from "zod";
import { statusSchema } from "./common.schema";

export const createCategorySchema = z.object({
  title: z
    .string({ message: "Invalid" })
    .min(1, "Tilte is required")
    .trim(),

  description: z
    .string({ message: "Invalid" })
    .min(1, "Description is required")
    .trim(),
  status: statusSchema,
});


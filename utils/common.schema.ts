import { z } from "zod";
export const statusSchema = z
  .string()
  .optional()
  .transform((val) => val?.toUpperCase())
  .refine(
    (val) => !val || val === "ACTIVE" || val === "DRAFT",
    {
      message: "Status must be ACTIVE or DRAFT",
    }
  );

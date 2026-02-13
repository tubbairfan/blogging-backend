import { z } from "zod";
import { CategoryErrors } from "./categoryErrors";

export const createCategorySchema = z.object({
  title: z.string()
    .optional() 
    .refine(val => typeof val === "string" && val.trim() !== "", {
      message: CategoryErrors.NAME_REQUIRED,
    })
    .transform(val => val!.trim()), 
  description: z.string()
    .optional()
    .refine(val => typeof val === "string" && val.trim() !== "", {
      message: CategoryErrors.DESCRIPTION_REQUIRED,
    })
    .transform(val => val!.trim()),
});

export const updateCategorySchema = z.object({
  title: z.string()
    .refine(val => val !== undefined && val !== null, { message: CategoryErrors.NAME_REQUIRED })
    .nonempty(CategoryErrors.NAME_REQUIRED),
  description: z.string()
    .refine(val => val !== undefined && val !== null, { message: CategoryErrors.DESCRIPTION_REQUIRED })
    .nonempty(CategoryErrors.DESCRIPTION_REQUIRED),
});




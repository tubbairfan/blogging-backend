import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message);
      return res.status(400).json({ errors });
    }

    req.body = result.data; 
    next();
  };
};

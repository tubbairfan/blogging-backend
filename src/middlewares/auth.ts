import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../utils/jwt";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyAccessToken(token);
    (req as Request & { user?: typeof decoded }).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyAccessToken(token);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: admin only" });
    }

    (req as Request & { user?: typeof decoded }).user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

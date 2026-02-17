import { Request, Response, NextFunction } from "express";

export const requireAdmin = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

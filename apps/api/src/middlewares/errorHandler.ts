import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[${req.headers["x-request-id"]}]`, err);
  res.status(500).json({ error: err.message || "Internal server error" });
}

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = "secret";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const verification = jwt.verify(token?.split(" ")[1] || "", secret);
    if (!verification) {
      res.status(401).json({ message: "Unauthorized" });
    }

    res.locals.user = verification;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

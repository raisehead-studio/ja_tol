import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errors: "Unauthorized" });
  }

  try {
    const decoded_token = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    );
    next();
  } catch (err) {
    return res.status(403).json({ errors: "Unauthorized" });
  }
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";

interface RequestWithUser extends Request {
  user?: {
    name: string;
    uid: string;
  };
}

export const verify = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errors: "Unauthorized" });
  }

  try {
    const decoded_token: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (!decoded_token) {
      return res.json({
        code: 401,
        data: null,
        status: "warning",
        message: "Unauthorized",
      });
    } else {
      User.findOne({ where: { uid: decoded_token.id } }).then((user: any) => {
        if (user) {
          req.user = {
            name: user.name,
            uid: user.uid,
          };
          next();
        } else {
          return res.json({
            code: 401,
            data: null,
            status: "warning",
            message: "Unauthorized",
          });
        }
      });
    }

    // req.user = decoded_token;
  } catch (err) {
    return res.json({
      code: 401,
      data: null,
      status: "warning",
      message: "Unauthorized",
    });
  }
};

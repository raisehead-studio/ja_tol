import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";
import Permissions from "../models/permissions";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { account, password } = req.body;
  try {
    User.findOne({ where: { account: account } }).then((user) => {
      if (!user)
        return res.status(401).json({
          status: "failed",
          message: "帳號錯誤，請重新輸入。",
        });

      // if not valid, return unathorized response
      if (password !== user.dataValues.password)
        return res.status(401).json({
          status: "failed",
          message: "密碼錯誤，請重新輸入。",
        });
      // return user info except password

      const accessToken = generateAccessToken(user.dataValues.uid);
      const refreshToken = generateRefreshToken(user.dataValues.uid);

      res.status(200).json({
        status: "success",
        data: {
          uid: user.dataValues.uid,
          account: user.dataValues.account,
          name: user.dataValues.name,
          role: user.dataValues.role,
          accessToken,
          refreshToken,
        },
      });
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};

export const token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (token === null) return res.sendStatus(401);
    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user.id);
        return res.status(200).json({
          status: 200,
          message: "customer updated!",
          data: accessToken,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};

export const status = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user.id);

        Permissions.findOne({ where: { uid: user.id } }).then((permission) => {
          let permissionData = permission?.dataValues;
          delete permissionData?.uid;
          delete permissionData?.pid;
          delete permissionData?.createdAt;
          delete permissionData?.updatedAt;

          User.findOne({ where: { uid: user.id } }).then((user_data: any) => {
            res.status(200).json({
              status: 200,
              data: {
                uid: user_data.uid,
                account: user_data.account,
                name: user_data.name,
                role: user_data.role,
                token: accessToken,
                permission: permissionData,
              },
            });
          });
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "30s",
  });
};

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "90d",
  });
};

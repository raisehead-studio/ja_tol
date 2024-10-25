import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";
import Permissions from "../models/permissions";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { account, password } = req.body;

  const user = await User.findOne({ where: { account: account } });
  const dbUser = user?.toJSON();

  console.log(dbUser);

  try {
    User.findOne({ where: { account: account } })
      .then((user) => {
        if (!user) {
          return res.json({
            code: 401,
            status: "warning",
            data: null,
            message: "帳號錯誤，請重新輸入。",
          });
        } else if (password !== user.dataValues.password) {
          return res.json({
            code: 401,
            data: null,
            status: "warning",
            message: "密碼錯誤，請重新輸入。",
          });
        } else {
          const accessToken = generateAccessToken(user.dataValues.uid);
          const refreshToken = generateRefreshToken(user.dataValues.uid);

          return res.json({
            code: 200,
            status: "success",
            data: {
              uid: user.dataValues.uid,
              account: user.dataValues.account,
              name: user.dataValues.name,
              role: user.dataValues.role,
              accessToken,
              refreshToken,
            },
            message: "登入成功",
          });
        }
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `登入時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `登入時發生問題。 ${err}`,
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
    if (token === null) {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `請帶入對應參數 token。`,
      });
    }
    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得 token 發生錯誤 ${err}`,
          });
        }
        const accessToken = generateAccessToken(user.id);

        return res.json({
          code: 200,
          status: "success",
          data: accessToken,
          message: `取得 token 成功。`,
        });
      }
    );
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得 token 發生錯誤 ${err}`,
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
    if (!token) {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `header 沒有參數`,
      });
    } else {
      jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
        (err: any, user: any) => {
          if (err) return res.sendStatus(403);
          const accessToken = generateAccessToken(user.id);
          Permissions.findOne({ where: { uid: user.id } })
            .then((permission) => {
              let permissionData = permission?.dataValues;
              delete permissionData?.uid;
              delete permissionData?.pid;
              delete permissionData?.createdAt;
              delete permissionData?.updatedAt;
              User.findOne({ where: { uid: user.id } })
                .then((user_data: any) => {
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
                })
                .catch((err) => {
                  return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `取得狀態發生問題 ${err}。`,
                  });
                });
            })
            .catch((err) => {
              return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `取得狀態發生問題 ${err}。`,
              });
            });
        }
      );
    }
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得狀態發生問題 ${err}。`,
    });
  }
};

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "3650d",
  });
};

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "90d",
  });
};

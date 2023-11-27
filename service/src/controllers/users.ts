import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user";

export const create_user = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }
  const account = req.body.account;
  const name = req.body.name;
  const password = req.body.password;
  const role = req.body.role;

  User.findOne({ where: { account: account } }).then((user) => {
    if (!user) {
      bcrypt.hash(password, 12).then((hashedPw) => {
        User.create({
          account: account,
          password: hashedPw,
          name: name,
          role: role,
        })
          .then((result) => {
            res
              .status(200)
              .json({ message: "User created!", uid: result.dataValues.uid });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      });
    } else {
      return res.status(422).json({
        message: "This account was used! Please pick a new account.",
      });
    }
  });
};

export const get_users = (req: Request, res: Response, next: NextFunction) => {
  User.findAll().then((users) => {
    return res.status(200).json({
      status: 200,
      data: users,
    });
  });
};

export const get_user = (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params;
  User.findOne({
    where: { uid: uid },
  }).then((user) => {
    return res.status(200).json({
      status: 200,
      data: user,
    });
  });
};

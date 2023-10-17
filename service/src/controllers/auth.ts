import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
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

  User.findOne({ where: { account: account } }).then((user) => {
    if (!user) {
      bcrypt.hash(password, 12).then((hashedPw) => {
        User.create({
          account: account,
          password: hashedPw,
          name: name,
          role: "admin",
        })
          .then((result) => {
            res
              .status(201)
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

// exports.login = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedUser;
//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("A user with this email could not be found.");
//         error.statusCode = 401;
//         throw error;
//       }
//       loadedUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       if (!isEqual) {
//         const error = new Error("Wrong password!");
//         error.statusCode = 401;
//         throw error;
//       }
//       const token = jwt.sign(
//         {
//           email: loadedUser.email,
//           userId: loadedUser._id.toString(),
//         },
//         "somesupersecretsecret",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({ token: token, userId: loadedUser._id.toString() });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

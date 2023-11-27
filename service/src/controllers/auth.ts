import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";

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
          data: [],
          message:
            "Invalid email or password. Please try again with the correct credentials.",
        });

      const isPasswordValid = bcrypt.compare(
        password,
        user.dataValues.password
      );
      // if not valid, return unathorized response
      if (!isPasswordValid)
        return res.status(401).json({
          status: "failed",
          data: [],
          message:
            "Invalid email or password. Please try again with the correct credentials.",
        });
      // return user info except password

      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.JWT_SECRET as string,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: "1m",
        }
      );

      res.status(200).json({
        status: "success",
        data: {
          uid: user.dataValues.uid,
          account: user.dataValues.account,
          name: user.dataValues.name,
          role: user.dataValues.role,
          token: token,
        },
        message: "You have successfully logged in.",
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

// export const verify = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers["cookie"]; // get the session cookie from request header

//     if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
//     const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt

//     // Verify using jwt to see if token has been tampered with or if it has expired.
//     // that's like checking the integrity of the cookie
//     jwt.verify(
//       cookie,
//       process.env.JWT_SECRET as string,
//       async (err, decoded) => {
//         if (err) {
//           // if token has been altered or has expired, return an unauthorized error
//           return res
//             .status(401)
//             .json({ message: "This session has expired. Please login" });
//         }

//         const { uid } = decoded; // get user id from the decoded token
//         const user = await User.findById(id); // find user by that `id`
//         const { password, ...data } = user._doc; // return user object without the password
//         req.user = data; // put the data object into req.user
//         next();
//       }
//     );
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       code: 500,
//       data: [],
//       message: "Internal Server Error",
//     });
//   }
// };
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

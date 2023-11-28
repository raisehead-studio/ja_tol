import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user";
import Permissions from "../models/permissions";

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
      User.create({
        account: account,
        password: bcrypt.hashSync(password),
        name: name,
        role: role,
      })
        .then((result) => {
          if (role === "admin") {
            Permissions.create({
              uid: result.dataValues.uid,
              is_tracking_page: true,
              is_tracking_page_insert: true,
              is_tracking_page_update: true,
              is_tracking_page_read: true,
              is_tracking_page_delete: true,
              is_customer_page: true,
              is_customer_page_insert: true,
              is_customer_page_update: true,
              is_customer_page_read: true,
              is_customer_page_delete: true,
              is_service_page: true,
              is_service_page_insert: true,
              is_service_page_update: true,
              is_service_page_read: true,
              is_service_page_delete: true,
              is_work_page: true,
              is_work_page_insert: true,
              is_work_page_update: true,
              is_work_page_read: true,
              is_work_page_delete: true,
              is_admin_page: true,
              is_admin_page_insert: true,
              is_admin_page_update: true,
              is_admin_page_read: true,
              is_admin_page_delete: true,
            }).then(() => {
              res
                .status(200)
                .json({ message: "User created!", uid: result.dataValues.uid });
            });
          } else if (role === "operator") {
            Permissions.create({
              uid: result.dataValues.uid,
              is_tracking_page: true,
              is_tracking_page_insert: false,
              is_tracking_page_update: false,
              is_tracking_page_read: true,
              is_tracking_page_delete: false,
              is_customer_page: true,
              is_customer_page_insert: false,
              is_customer_page_update: false,
              is_customer_page_read: true,
              is_customer_page_delete: false,
              is_service_page: true,
              is_service_page_insert: false,
              is_service_page_update: false,
              is_service_page_read: true,
              is_service_page_delete: false,
              is_work_page: true,
              is_work_page_insert: false,
              is_work_page_update: false,
              is_work_page_read: true,
              is_work_page_delete: false,
              is_admin_page: false,
              is_admin_page_insert: false,
              is_admin_page_update: false,
              is_admin_page_read: false,
              is_admin_page_delete: false,
            }).then(() => {
              res.status(200).json({
                message: "User created!",
                uid: result.dataValues.uid,
              });
            });
          } else if (role === "engineer") {
            Permissions.create({
              uid: result.dataValues.uid,
              is_tracking_page: true,
              is_tracking_page_insert: false,
              is_tracking_page_update: true,
              is_tracking_page_read: true,
              is_tracking_page_delete: false,
              is_customer_page: true,
              is_customer_page_insert: false,
              is_customer_page_update: true,
              is_customer_page_read: true,
              is_customer_page_delete: false,
              is_service_page: true,
              is_service_page_insert: false,
              is_service_page_update: true,
              is_service_page_read: true,
              is_service_page_delete: false,
              is_work_page: true,
              is_work_page_insert: false,
              is_work_page_update: true,
              is_work_page_read: true,
              is_work_page_delete: false,
              is_admin_page: false,
              is_admin_page_insert: false,
              is_admin_page_update: false,
              is_admin_page_read: false,
              is_admin_page_delete: false,
            }).then(() => {
              res.status(200).json({
                message: "User created!",
                uid: result.dataValues.uid,
              });
            });
          }
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
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
    include: {
      model: Permissions,
      attributes: [
        "is_tracking_page",
        "is_tracking_page_insert",
        "is_tracking_page_update",
        "is_tracking_page_read",
        "is_tracking_page_delete",
        "is_customer_page",
        "is_customer_page_insert",
        "is_customer_page_update",
        "is_customer_page_read",
        "is_customer_page_delete",
        "is_service_page",
        "is_service_page_insert",
        "is_service_page_update",
        "is_service_page_read",
        "is_service_page_delete",
        "is_work_page",
        "is_work_page_insert",
        "is_work_page_update",
        "is_work_page_read",
        "is_work_page_delete",
        "is_admin_page",
        "is_admin_page_insert",
        "is_admin_page_update",
        "is_admin_page_read",
        "is_admin_page_delete",
      ],
    },
  }).then((user: any) => {
    return res.status(200).json({
      status: 200,
      data: {
        ...user.dataValues,
        permission: user?.permission.dataValues,
      },
    });
  });
};

export const update_user = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      uid,
      account,
      password,
      name,
      role,
      is_tracking_page,
      is_tracking_page_insert,
      is_tracking_page_update,
      is_tracking_page_read,
      is_tracking_page_delete,
      is_customer_page,
      is_customer_page_insert,
      is_customer_page_update,
      is_customer_page_read,
      is_customer_page_delete,
      is_service_page,
      is_service_page_insert,
      is_service_page_update,
      is_service_page_read,
      is_service_page_delete,
      is_work_page,
      is_work_page_insert,
      is_work_page_update,
      is_work_page_read,
      is_work_page_delete,
      is_admin_page,
      is_admin_page_insert,
      is_admin_page_update,
      is_admin_page_read,
      is_admin_page_delete,
    } = req.body;

    User.findOne({
      where: { uid: uid },
    }).then((user: any) => {
      user.account = account;
      user.name = name;
      user.role = role;
      if (password) {
        user.password = bcrypt.hashSync(password);
      }
      user.save();
      Permissions.findOne({
        where: { uid: uid },
      }).then((permission: any) => {
        permission.is_tracking_page = is_tracking_page;
        permission.is_tracking_page_insert = is_tracking_page_insert;
        permission.is_tracking_page_update = is_tracking_page_update;
        permission.is_tracking_page_read = is_tracking_page_read;
        permission.is_tracking_page_delete = is_tracking_page_delete;
        permission.is_customer_page = is_customer_page;
        permission.is_customer_page_insert = is_customer_page_insert;
        permission.is_customer_page_update = is_customer_page_update;
        permission.is_customer_page_read = is_customer_page_read;
        permission.is_customer_page_delete = is_customer_page_delete;
        permission.is_service_page = is_service_page;
        permission.is_service_page_insert = is_service_page_insert;
        permission.is_service_page_update = is_service_page_update;
        permission.is_service_page_read = is_service_page_read;
        permission.is_service_page_delete = is_service_page_delete;
        permission.is_work_page = is_work_page;
        permission.is_work_page_insert = is_work_page_insert;
        permission.is_work_page_update = is_work_page_update;
        permission.is_work_page_read = is_work_page_read;
        permission.is_work_page_delete = is_work_page_delete;
        permission.is_admin_page = is_admin_page;
        permission.is_admin_page_insert = is_admin_page_insert;
        permission.is_admin_page_update = is_admin_page_update;
        permission.is_admin_page_read = is_admin_page_read;
        permission.is_admin_page_delete = is_admin_page_delete;
        permission.save();

        return res.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "something went wrong when updating assignment.",
      error: err,
    });
    next(err);
  }
};

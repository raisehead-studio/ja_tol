import { Request, Response, NextFunction } from "express";

import User from "../models/user";
import Permissions from "../models/permissions";

interface RequestWithUser extends Request {
  user?: {
    name: string;
    uid: string;
  };
}

export const create_user = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { account, name, password, role } = req.body;
  const { user } = req;
  let create_member = user?.uid;
  let update_member = user?.uid;

  User.findOne({ where: { account: account } })
    .then((user: any) => {
      if (!user) {
        User.create({
          account,
          password,
          name,
          role,
          update_member: update_member,
          create_member: create_member,
          is_del: false,
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
              })
                .then(() => {
                  return res.json({
                    code: 200,
                    status: "success",
                    data: {
                      uid: result.dataValues.uid,
                    },
                    message: `建立人員成功。`,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 500,
                    message: "something went wrong when creating user.",
                    error: err,
                  });
                  next(err);
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
              })
                .then(() => {
                  return res.json({
                    code: 200,
                    status: "success",
                    data: {
                      uid: result.dataValues.uid,
                    },
                    message: `建立人員成功。`,
                  });
                  next();
                })
                .catch((err) => {
                  return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立人員時發生問題。 ${err}`,
                  });
                  next(err);
                });
            } else if (role === "engineer") {
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
              })
                .then(() => {
                  return res.json({
                    code: 200,
                    status: "success",
                    data: {
                      uid: result.dataValues.uid,
                    },
                    message: `建立人員成功。`,
                  });
                })
                .catch((err) => {
                  return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立人員時發生問題。 ${err}`,
                  });
                  next(err);
                });
            }
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `建立人員時發生問題。 ${err}`,
            });
            next();
          });
      } else {
        return res.json({
          code: 401,
          status: "success",
          data: null,
          message: `此人員已存在。`,
        });
      }
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `建立人員時發生問題。 ${err}`,
      });
      next();
    });
};

export const get_users = (
  _: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  User.findAll({ where: { is_del: false } })
    .then((users) => {
      return res.json({
        code: 200,
        status: "success",
        data: users,
        message: `取得人員成功。`,
      });
      next();
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `取得人員時發生問題。 ${err}`,
      });
      next();
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
  })
    .then((user: any) => {
      return res.json({
        code: 200,
        status: "success",
        data: {
          ...user.dataValues,
          permission: user?.permission.dataValues,
        },
        message: `取得人員成功。`,
      });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `取得人員時發生問題。 ${err}`,
      });
      next();
    });
};

export const update_user = (
  req: RequestWithUser,
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

    const { user } = req;
    const update_member = user?.uid;

    User.findOne({
      where: { uid: uid },
    }).then((user: any) => {
      user.account = account;
      user.name = name;
      user.role = role;

      if (password) {
        user.password = password;
      }
      user.update_member = update_member;
      user.save();
      Permissions.findOne({
        where: { uid: uid },
      })
        .then((permission: any) => {
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
          permission.update_member = update_member;
          permission.save();

          return res.json({
            code: 200,
            status: "success",
            data: null,
            message: `更新人員資料成功。`,
          });
          next();
        })
        .catch((err) => {
          return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新人員資料時發生問題。 ${err}`,
          });
          next(err);
        });
    });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新人員資料時發生問題。 ${err}`,
    });
    next(err);
  }
};

export const delete_user = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.params;
  const { user } = req;
  const update_member = user?.uid;

  try {
    User.findOne({ where: { uid: uid } })
      .then((user: any) => {
        user.is_del = true;
        user.update_member = update_member;
        user.save();
      })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `刪除人員成功。`,
        });
        next();
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `刪除人員資料時發生問題。 ${err}`,
        });
        next(err);
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `刪除人員資料時發生問題。 ${err}`,
    });
    next(err);
  }
};

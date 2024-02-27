import { Request, Response, NextFunction } from "express";

import CustomerService from "../models/service";
import CustomerServiceContent from "../models/service_content";
import Customer from "../models/customer";
import User from "../models/user";

interface RequestWithUser extends Request {
  user?: {
    name: string;
    uid: string;
  };
}

export const create_service = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { cid, title, status, type, notify_date, content } = req.body;
  const { user } = req;

  CustomerService.create({
    cid,
    title,
    status,
    type,
    notify_date,
    update_member: user?.uid,
    create_member: user?.uid,
    is_del: false,
  })
    .then((service) => {
      CustomerServiceContent.create({
        content,
        csid: service.dataValues.csid,
        update_member: user?.uid,
        create_member: user?.uid,
        create_date: new Date(),
        is_del: false,
      })
        .then(() => {
          return res.json({
            code: 200,
            status: "success",
            data: {
              csid: service.dataValues.csid,
            },
            message: `建立客服紀錄成功。`,
          });
        })
        .catch((err) => {
          return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立客服紀錄時發生問題。 ${err}`,
          });
        });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `建立客服紀錄時發生問題。 ${err}`,
      });
    });
};

export const get_service_list = (req: Request, res: Response) => {
  const { orderBy, orderType } = req.query;

  CustomerService.findAll({
    where: { is_del: false },
    attributes: [
      "csid",
      "title",
      "status",
      "type",
      "notify_date",
      "update_member",
      "create_member",
      "updatedAt",
      "createdAt",
    ],
    include: {
      model: Customer,
      attributes: ["customer_number", "short_name"],
    },
  })
    .then(async (result) => {
      let data;
      const users: any = await User.findAll({ where: { is_del: false } });

      data = result.map((item) => {
        return {
          id: item.dataValues.csid,
          title: item.dataValues.title,
          status: item.dataValues.status,
          type: item.dataValues.type,
          notify_date: new Date(item.dataValues.notify_date).getTime(),
          update_member: users.filter(
            (user: any) => item.dataValues.update_member === user.uid
          )[0].name,
          create_member: users.filter(
            (user: any) => item.dataValues.update_member === user.uid
          )[0].name,
          update_date: new Date(item.dataValues.updatedAt).getTime(),
          customer_number: item.dataValues.customer.dataValues.customer_number,
          short_name: item.dataValues.customer.dataValues.short_name,
          create_date: new Date(item.dataValues.createdAt).getTime(),
        };
      });

      if (orderBy && orderType) {
        if (
          orderBy === "update_date" ||
          orderBy === "create_date" ||
          orderBy === "notify_date"
        ) {
          data.sort((a: any, b: any) => {
            if (orderType === "asc") {
              return a[orderBy.toString()] - b[orderBy.toString()];
            } else {
              return b[orderBy.toString()] - a[orderBy.toString()];
            }
          });
        } else {
          data.sort((a: any, b: any) => {
            if (orderType === "asc") {
              return a[orderBy.toString()].localeCompare(b[orderBy.toString()]);
            } else {
              return b[orderBy.toString()].localeCompare(a[orderBy.toString()]);
            }
          });
        }
      }

      return res.json({
        code: 200,
        status: "success",
        data: data,
        message: `取得客服資料列表成功。`,
      });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `得客服資料列表時發生問題。 ${err}`,
      });
    });
};

export const get_service_detail = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const csid = req.params.csid;

  CustomerService.findOne({
    where: { csid },
    attributes: [
      "title",
      "status",
      "type",
      "notify_date",
      "update_member",
      "create_member",
      "updatedAt",
      "createdAt",
      "create_date",
    ],
    include: [
      {
        model: CustomerServiceContent,
        attributes: ["cscid", "content", "createdAt"],
      },
      {
        model: Customer,
        attributes: ["customer_number", "short_name"],
      },
    ],
  })
    .then(async (result: any) => {
      let data: any = {};
      const update_name = await User.findOne({
        where: { uid: result.dataValues.update_member },
      });
      const create_name = await User.findOne({
        where: { uid: result.dataValues.create_member },
      });

      data.short_name = result.dataValues.customer.short_name;
      data.customer_number = result.dataValues.customer.customer_number;
      data.title = result.dataValues.title;
      data.status = result.dataValues.status;
      data.type = result.dataValues.type;
      data.notify_date = new Date(result.dataValues.notify_date).getTime();
      data.update_member = update_name;
      data.create_member = create_name;
      data.create_date = new Date(result.dataValues.createdAt).getTime();
      data.customer_service_contents =
        result.dataValues.customer_service_contents.map((item: any) => {
          return {
            id: item.dataValues.cscid,
            content: item.dataValues.content,
            create_date: new Date(item.dataValues.createdAt).getTime(),
          };
        });

      return res.json({
        code: 200,
        status: "success",
        data: data,
        message: `取得客服資料成功。`,
      });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `取得客服資料時發生問題。 ${err}`,
      });
    });
};

export const create_service_content = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { csid, content } = req.body;
  const { user } = req;

  CustomerServiceContent.create({
    csid,
    content,
    update_member: user?.uid,
    create_member: user?.uid,
    is_del: false,
  })
    .then((result) => {
      return res.json({
        code: 200,
        status: "success",
        data: result,
        message: `建立客服紀錄內容成功。`,
      });
      next();
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `建立客服紀錄內容時發生問題。 ${err}`,
      });
    });
};

export const update_service = (req: RequestWithUser, res: Response) => {
  try {
    const {
      csid,
      title,
      status,
      type,
      notify_date,
      customer_service_contents,
    } = req.body;
    const { user } = req;

    CustomerService.findOne({
      where: { csid },
    })
      .then((service: any) => {
        if (service) {
          service.title = title;
          service.status = status;
          service.type = type;
          service.notify_date = notify_date;
          service.update_member = user?.uid;

          service.save();
          let update_customer_service_contents = JSON.parse(
            customer_service_contents
          );
          let execution = [];
          const handle_update_customer_service_content = async (
            cscid: string,
            content: string
          ) => {
            const service_content: any = await CustomerServiceContent.findOne({
              where: { cscid: cscid },
            });
            service_content.content = content;
            service_content.update_member = user?.uid;
            await service_content.save();
          };
          for (let i = 0; i < update_customer_service_contents.length; i++) {
            execution.push(
              handle_update_customer_service_content(
                update_customer_service_contents[i].cscid,
                update_customer_service_contents[i].content
              )
            );
          }
          Promise.all(execution)
            .then(() => {
              return res.json({
                code: 200,
                status: "success",
                data: null,
                message: `更新客服紀錄成功。`,
              });
            })
            .catch((err) => {
              return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `更新客服紀錄時發生問題。 ${err}`,
              });
            });
        } else {
          return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新客服紀錄時發生問題。 沒有此筆客服紀錄資料`,
          });
        }
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `更新客服紀錄時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新客服紀錄時發生問題。 ${err}`,
    });
  }
};

export const delete_service = (req: RequestWithUser, res: Response) => {
  try {
    const { csid } = req.params;
    const { user } = req;

    CustomerService.findOne({ where: { csid: csid } })
      .then(async (service: any) => {
        service.is_del = true;
        service.update_member = user?.uid;
        await service.save();
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `刪除客服紀錄成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `刪除客服紀錄時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `刪除客服紀錄時發生問題。 ${err}`,
    });
  }
};

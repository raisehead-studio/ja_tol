import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import CustomerService from "../models/service";
import CustomerServiceContent from "../models/service_content";
import Customer from "../models/customer";

export const create_service = (
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

  const {
    cid,
    title,
    status,
    type,
    notify_date,
    update_member,
    create_member,
    content,
  } = req.body;

  CustomerService.create({
    cid,
    title,
    status,
    type,
    notify_date,
    update_member,
    create_member,
  })
    .then((service) => {
      CustomerServiceContent.create({
        content,
        csid: service.dataValues.csid,
      })
        .then(() => {
          return res.status(200).json({
            message: "Customer service created",
            status: 200,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: "error",
            code: 500,
            err: err,
            message: "發生問題。",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        code: 500,
        err: err,
        message: "發生問題。",
      });
    });
};

export const get_service_list = (req: Request, res: Response) => {
  CustomerService.findAll({
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
    .then((result) => {
      res.status(200).json({
        status: 200,
        data: result.map((item) => {
          return {
            id: item.dataValues.csid,
            title: item.dataValues.title,
            status: item.dataValues.status,
            type: item.dataValues.type,
            notify_date: new Date(item.dataValues.notify_date).getTime(),
            update_member: item.dataValues.update_member,
            create_member: item.dataValues.create_member,
            update_date: new Date(item.dataValues.updatedAt).getTime(),
            customer_number:
              item.dataValues.customer.dataValues.customer_number,
            short_name: item.dataValues.customer.dataValues.short_name,
            create_date: new Date(item.dataValues.createdAt).getTime(),
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        code: 500,
        err: err,
        message: "發生問題。",
      });
    });
};

export const get_service_detail = (
  req: Request,
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
    .then((result) => {
      if (!result)
        return res.status(500).json({
          status: 500,
          error: "something went wrong when getting service detail.",
        });
      let data: any = {};

      data.short_name = result.dataValues.customer.short_name;
      data.customer_number = result.dataValues.customer.customer_number;
      data.title = result.dataValues.title;
      data.status = result.dataValues.status;
      data.type = result.dataValues.type;
      data.notify_date = new Date(result.dataValues.notify_date).getTime();
      data.update_member = result.dataValues.update_member;
      data.create_member = result.dataValues.create_member;
      data.create_date = new Date(result.dataValues.updatedAt).getTime();
      data.customer_service_contents =
        result.dataValues.customer_service_contents.map((item: any) => {
          return {
            id: item.dataValues.cscid,
            content: item.dataValues.content,
            create_date: new Date(item.dataValues.createdAt).getTime(),
          };
        });

      return res.status(200).json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        code: 500,
        err: err,
        message: "發生問題。",
      });
    });
};

export const create_service_content = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { csid, content } = req.body;

  CustomerServiceContent.create({
    csid,
    content,
  })
    .then(() => {
      return res.status(200).json({
        message: "Customer service content created",
        status: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        code: 500,
        err: err,
        message: "發生問題。",
      });
    });
};

export const update_service = (req: Request, res: Response) => {
  try {
    const {
      csid,
      title,
      status,
      type,
      notify_date,
      update_member,
      customer_service_contents,
    } = req.body;

    CustomerService.findOne({
      where: { csid },
    })
      .then((service: any) => {
        if (service) {
          service.title = title;
          service.status = status;
          service.type = type;
          service.notify_date = notify_date;
          service.update_member = update_member;
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
              res.status(200).json({
                message: "Customer service updated",
                status: 200,
              });
            })
            .catch((err) => {
              res.status(500).json({
                status: "error",
                code: 500,
                err: err,
                message: "發生問題。",
              });
            });
        } else {
          res.status(500).json({
            status: "error",
            code: 500,
            message: "發生問題。",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          code: 500,
          err: err,
          message: "發生問題。",
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      err: err,
      message: "發生問題。",
    });
  }
};

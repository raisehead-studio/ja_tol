import { Request, Response, NextFunction } from "express";

import CustomerService from "../models/service";
import Customer from "../models/customer";
import WorkOrder from "../models/work_orders";

export const get_tracking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  CustomerService.findAll({
    attributes: [
      "csid",
      "title",
      "type",
      "notify_date",
      "update_member",
      "create_member",
      "updatedAt",
    ],
    include: {
      model: Customer,
      attributes: ["customer_number", "short_name"],
    },
  })
    .then((service) => {
      let data: any = [];
      service.forEach((item) => {
        data.push({
          id: item.dataValues.csid,
          notify_date: new Date(item.dataValues.notify_date).getTime(),
          customer_number: item.dataValues.customer.dataValues.customer_number,
          short_name: item.dataValues.customer.dataValues.short_name,
          work_order_number: "客服紀錄",
          item: item.dataValues.type,
          description: item.dataValues.title,
          update_member: item.dataValues.update_member,
          update_date: new Date(item.dataValues.updatedAt).getTime(),
        });
      });
      WorkOrder.findAll({
        include: [
          {
            model: Customer,
            attributes: ["customer_number", "short_name"],
          },
        ],
      })
        .then((work_orders) => {
          work_orders.forEach((item) => {
            data.push({
              id: item.dataValues.woid,
              notify_date: new Date(item.dataValues.notify_date).getTime(),
              customer_number:
                item.dataValues.customer.dataValues.customer_number,
              short_name: item.dataValues.customer.dataValues.short_name,
              work_order_number: item.dataValues.order_number,
              item: "",
              description: "",
              update_member: item.dataValues.update_member,
              update_date: new Date(item.dataValues.updatedAt).getTime(),
            });
          });

          return res.status(200).json({
            status: 200,
            data: data,
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};

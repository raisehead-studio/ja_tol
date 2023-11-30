import { Request, Response, NextFunction } from "express";

import CustomerService from "../models/service";
import Customer from "../models/customer";
import WorkOrder from "../models/work_orders";
import ToBill from "../models/tobill";
import AcceptanceCheck from "../models/acceptance_check";
import Factorys from "../models/factorys";
import Assignments from "../models/assignments";

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
    include: [
      {
        model: Customer,
        attributes: ["customer_number", "short_name"],
      },
    ],
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
          {
            model: ToBill,
            attributes: [
              "tracking_date",
              "tracking_is_finished",
              "tracking_description",
            ],
          },
          {
            model: AcceptanceCheck,
            attributes: [
              "tracking_date",
              "tracking_is_finished",
              "tracking_description",
            ],
          },
          {
            model: Factorys,
            attributes: [
              "tracking_date",
              "tracking_is_finished",
              "tracking_description",
            ],
          },
          {
            model: Assignments,
            attributes: [
              "tracking_date",
              "tracking_is_finished",
              "tracking_description",
            ],
          },
        ],
      })
        .then((work_orders: any) => {
          work_orders.forEach((item: any) => {
            let item_data;
            let description;
            let date;

            if (!item.dataValues.assignment.dataValues.tracking_is_finished) {
              item_data = "112WT0268派工";
              description =
                item.dataValues.assignment.dataValues.tracking_description;
              date = item.dataValues.assignment.dataValues.tracking_date;
            } else {
              if (!item.dataValues.factory.dataValues.tracking_is_finished) {
                item_data = "112WT0187入廠";
                description =
                  item.dataValues.factory.dataValues.tracking_description;
                date = item.dataValues.factory.dataValues.tracking_date;
              } else {
                if (
                  !item.dataValues.acceptance_check.dataValues
                    .tracking_is_finished
                ) {
                  item_data = "112WT0268驗收";
                  description =
                    item.dataValues.acceptance_check.dataValues
                      .tracking_description;
                  date =
                    item.dataValues.acceptance_check.dataValues.tracking_date;
                } else {
                  if (!item.dataValues.tobill.dataValues.tracking_is_finished) {
                    item_data = "112WT0551請款";
                    description =
                      item.dataValues.tobill.dataValues.tracking_description;
                    date = item.dataValues.tobill.dataValues.tracking_date;
                  }
                }
              }
            }

            if (item_data) {
              data.push({
                id: item.dataValues.woid,
                notify_date: new Date(date).getTime(),
                customer_number:
                  item.dataValues.customer.dataValues.customer_number,
                short_name: item.dataValues.customer.dataValues.short_name,
                work_order_number: item.dataValues.order_number,
                item: item_data,
                description: description,
                update_member: item.dataValues.update_member,
                update_date: new Date(item.dataValues.updatedAt).getTime(),
              });
            }
          });

          res.status(200).json({
            status: 200,
            data: data,
          });
          next();
        })
        .catch((err) => {
          res.status(500).json({
            status: "error",
            code: 500,
            err: err,
            message: "發生問題。",
          });
          next();
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        code: 500,
        err: err,
        message: "發生問題。",
      });
      next();
    });
};

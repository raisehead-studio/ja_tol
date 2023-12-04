import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";

import Customer from "../models/customer";
import CustomerContact from "../models/customer_contact";
import ElePlace from "../models/ele_place";
import CustomerService from "../models/service";

import { CustomerDataType, CustomerContactDataType } from "../types/customers";

interface RequestWithUser extends Request {
  user?: {
    name: string;
    uid: string;
  };
}

export const create_customer = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, short_name, customer_number, ele_number } = req.body;
  const { user } = req;

  Customer.findOne({
    where: {
      [Op.or]: {
        customer_number: customer_number,
        ele_number: ele_number,
        name: name,
      },
    },
  })
    .then((customer) => {
      if (!customer) {
        Customer.create({
          name: name,
          short_name: short_name,
          customer_number: customer_number,
          ele_number: ele_number,
          update_member: user?.uid,
          create_member: user?.uid,
          is_del: false,
        })
          .then((result) => {
            return res.json({
              code: 200,
              status: "success",
              data: {
                cid: result.dataValues.cid,
              },
              message: "建立客戶資料成功。",
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `建立客戶時發生問題 ${err}。`,
            });
          });
      } else {
        return res.json({
          code: 401,
          status: "warning",
          data: null,
          message: `顧客重複。`,
        });
        next();
      }
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `建立客戶時發生問題 ${err}。`,
      });
    });
};

export const get_customers_list = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  Customer.findAll({
    where: { is_del: false },
    attributes: ["cid", "short_name", "customer_number", "name"],
  })
    .then((result) => {
      return res.json({
        code: 200,
        status: "success",
        data: result,
        message: `取得客戶列表成功。`,
      });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `取得客戶時發生問題 ${err}。`,
      });
      next(err);
    });
};

export const get_customers_detail = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const cid = req.params.cid;
  let data: CustomerDataType;

  Customer.findOne({
    where: { cid: cid },
    include: [
      {
        model: CustomerContact,
      },
      {
        model: ElePlace,
      },
      {
        model: CustomerService,
      },
    ],
  })
    .then((result) => {
      if (!result) {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `找不到此客戶資料。`,
        });
      } else {
        let data: any = {};
        data.cid = result.dataValues.cid;
        data.name = result.dataValues.name;
        data.short_name = result.dataValues.short_name;
        data.customer_number = result.dataValues.customer_number;
        data.ele_number = result.dataValues.ele_number;
        data.acceptance_check_description =
          result.dataValues.acceptance_check_description;
        data.factory_description = result.dataValues.factory_description;
        data.assignment_description = result.dataValues.assignment_description;
        data.tobill_description = result.dataValues.tobill_description;
        data.invoice_description = result.dataValues.invoice_description;
        data.customer_contacts = !Array.isArray(
          result.dataValues.customer_contacts
        )
          ? []
          : result.dataValues.customer_contacts.map((item: any) => {
              return {
                id: item.dataValues.ccid,
                name: item.dataValues.name,
                type: item.dataValues.type,
                phone: item.dataValues.phone,
                job_description: item.dataValues.job_description,
                title: item.dataValues.title,
                note: item.dataValues.note,
                email: item.dataValues.email,
              };
            });
        data.ele_place_name = result.dataValues.ele_place?.name || "";
        data.ele_place_address = result.dataValues.ele_place?.address || "";
        data.ele_place_owner = result.dataValues.ele_place?.owner || "";
        data.customer_services = !Array.isArray(
          result.dataValues.customer_services
        )
          ? []
          : result.dataValues.customer_services.map((item: any) => {
              return {
                id: item.dataValues.csid,
                title: item.dataValues.title,
                notify_date: item.dataValues.notify_date,
              };
            }) || [];

        return res.json({
          code: 200,
          status: "success",
          data: data,
          message: `取得客戶資料列表成功。`,
        });
      }
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `取得客戶資料時發生問題 ${err}。`,
      });
    });
};

export const create_ele_place = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, address, owner, cid } = req.body;
  const { user } = req;

  ElePlace.findOne({
    where: { name: name || "" },
  })
    .then((ele_place) => {
      if (!ele_place) {
        ElePlace.create({
          name: name,
          address: address,
          owner: owner,
          cid: cid,
          update_member: user?.uid,
          create_member: user?.uid,
          is_del: false,
        })
          .then((result) => {
            return res.json({
              code: 200,
              status: "success",
              data: {
                cid: result.dataValues.epid,
              },
              message: `用電場所資料建立成功。`,
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `建立用電場所時發生問題 ${err}。`,
            });
            next(err);
          });
      } else {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `用電場所已經存在。`,
        });
      }
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `建立用電場所時發生問題 ${err}。`,
      });
    });
};

export const create_customer_contact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, type, phone, job_description, title, cid, note, email } =
    req.body;
  const { user } = req;

  CustomerContact.create({
    name: name,
    cid: cid,
    type: type,
    phone: phone,
    job_description: job_description,
    title: title,
    note: note,
    email: email,
    update_member: user?.uid,
    create_member: user?.uid,
    is_del: false,
  })
    .then((result) => {
      return res.json({
        code: 200,
        status: "success",
        data: {
          cid: result.dataValues.epid,
        },
        message: `客戶聯絡人資料建立成功。`,
      });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        data: null,
        message: `建立客戶聯絡人時發生問題 ${err}。`,
      });
    });
};

export const update_customer_detail = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    cid,
    name,
    short_name,
    customer_number,
    ele_number,
    acceptance_check_description,
    factory_description,
    assignment_description,
    tobill_description,
    invoice_description,
    customer_contacts,
    customer_services,
    ele_place_name,
    ele_place_address,
    ele_place_owner,
  } = req.body;
  const { user } = req;

  try {
    Customer.findByPk(cid)
      .then((customer: any) => {
        customer.name = name;
        customer.short_name = short_name;
        customer.customer_number = customer_number;
        customer.ele_number = ele_number;
        customer.acceptance_check_description = acceptance_check_description;
        customer.factory_description = factory_description;
        customer.assignment_description = assignment_description;
        customer.tobill_description = tobill_description;
        customer.invoice_description = invoice_description;
        customer.update_member = user?.uid;
        customer.save();
        let executions: any = [];
        JSON.parse(customer_contacts).forEach((contact: any) => {
          executions.push(
            CustomerContact.findOne({
              where: { ccid: contact.id },
            })
              .then((customer_contact: any) => {
                customer_contact.name = contact.name;
                customer_contact.type = contact.type;
                customer_contact.phone = contact.phone;
                customer_contact.job_description = contact.job_description;
                customer_contact.title = contact.title;
                customer_contact.note = contact.note;
                customer_contact.email = contact.email;
                customer_contact.update_member = user?.uid;
                customer_contact.save();
              })
              .catch((err) => {
                return res.json({
                  code: 500,
                  status: "error",
                  data: null,
                  message: `編輯顧客基本資料時發生問題 ${err}。`,
                });
              })
          );
        });
        JSON.parse(customer_services).forEach((service: any) => {
          executions.push(
            CustomerService.findOne({
              where: { csid: service.id },
            })
              .then((customer_service: any) => {
                customer_service.title = service.title;
                customer_service.notify_date = service.notify_date;
                customer_service.update_member = user?.uid;
                customer_service.save();
              })
              .catch((err) => {
                return res.json({
                  code: 500,
                  status: "error",
                  data: null,
                  message: `編輯顧客基本資料時發生問題 ${err}。`,
                });
              })
          );
        });

        ElePlace.findOne({
          where: { cid: cid },
        }).then((ele_place: any) => {
          if (!ele_place) {
            ElePlace.create({
              name: ele_place_name,
              address: ele_place_address,
              owner: ele_place_owner,
              cid: cid,
              update_member: user?.uid,
              create_member: user?.uid,
              is_del: false,
            })
              .then(() => {
                Promise.all(executions)
                  .then(() => {
                    return res.json({
                      code: 200,
                      status: "success",
                      data: null,
                      message: `編輯顧客基本資料成功。`,
                    });
                  })
                  .catch((err) => {
                    return res.json({
                      code: 500,
                      status: "error",
                      data: null,
                      message: `編輯顧客基本資料時發生問題 ${err}。`,
                    });
                  });
              })
              .catch((err) => {
                return res.json({
                  code: 500,
                  status: "error",
                  data: null,
                  message: `編輯顧客基本資料時發生問題 ${err}。`,
                });
              });
          } else {
            ele_place.name = ele_place_name || "";
            ele_place.address = ele_place_address || "";
            ele_place.owner = ele_place_owner || "";
            ele_place.cid = cid;
            ele_place.update_member = user?.uid;
            ele_place.save();
            Promise.all(executions)
              .then(() => {
                return res.json({
                  code: 200,
                  status: "success",
                  data: null,
                  message: `編輯顧客基本資料成功。`,
                });
              })
              .catch((err) => {
                return res.json({
                  code: 500,
                  status: "error",
                  data: null,
                  message: `編輯顧客基本資料時發生問題 ${err}。`,
                });
              });
          }
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `編輯顧客基本資料時發生問題 ${err}。`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `編輯顧客基本資料時發生問題 ${err}。`,
    });
    next();
  }
};

export const delete_customer = (req: RequestWithUser, res: Response) => {
  try {
    const { cid } = req.params;
    const { user } = req;
    Customer.findOne({ where: { cid: cid } })
      .then((customer: any) => {
        customer.is_del = true;
        customer.update_member = user?.uid;
        customer.save();
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `刪除客戶成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `刪除客戶時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `刪除客戶時發生問題。 ${err}`,
    });
  }
};

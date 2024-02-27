import { Op } from "sequelize";
import e, { Request, Response, NextFunction } from "express";

import Customer from "../models/customer";
import CustomerContact from "../models/customer_contact";
import ElePlace from "../models/ele_place";
import CustomerService from "../models/service";
import User from "../models/user";

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
        name: name,
      },
    },
  })
    .then((customer: any) => {
      if (!customer || (customer && customer.is_del)) {
        Customer.create({
          name: name,
          short_name: short_name,
          customer_number: customer_number,
          ele_number: ele_number,
          factory_description:
            "系統內定，未編輯前 --> 進廠施工務必申請作業,,提供文件：勞保/團保/入廠證件/3H勞安證/動火申請/",
          acceptance_check_description:
            "系統內定，未編輯前 --> 前/中/後  之施工相片／產品保固一年／／／",
          tobill_description: "系統內定，未編輯前 --> 發票務必要註明P.O.編號",
          invoice_description:
            "系統內定，未編輯前 --> 本客戶固定都會議價10%以上,,所以報價者注意要先提高報價金額／本客戶有不良記錄,欠公司20萬,,請款刁難／本客戶為優質客戶不議價,,要求品質...等等",
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

export const get_customers_list = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { orderBy, orderType } = req.query;

  const users: any = await User.findAll({
    where: { is_del: false },
  });

  Customer.findAll({
    where: { is_del: false },
    attributes: [
      "cid",
      "short_name",
      "customer_number",
      "name",
      "ele_number",
      "update_member",
      "updatedAt",
    ],
    include: {
      model: ElePlace,
      attributes: ["name", "address", "registration_member_number"],
    },
  })
    .then((result: any) => {
      if (orderBy && orderType) {
        if (orderBy === "notify_date" || orderBy === "update_date") {
          result.sort((a: any, b: any) => {
            if (orderType === "asc") {
              return a[orderBy.toString()] - b[orderBy.toString()];
            } else {
              return b[orderBy.toString()] - a[orderBy.toString()];
            }
          });
        } else {
          result.sort((a: any, b: any) => {
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
        data: result.map((item: any) => {
          return {
            cid: item.cid,
            customer_number: item.customer_number,
            short_name: item.short_name,
            ele_place_name: item.ele_place?.name || "",
            ele_place_address: item.ele_place?.address || "",
            ele_number: item.ele_number,
            registration_member_number:
              item.ele_place?.registration_member_number,
            update_member: users.filter(
              (user: any) => user.uid === item.update_member
            )[0].name,
            update_date: item.updatedAt,
          };
        }),
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
        data.other_description = result.dataValues.other_description;
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
        data.registration_member_number =
          result.dataValues.ele_place?.registration_member_number || "";
        data.ele_engineer = result.dataValues.ele_place?.ele_engineer || "";
        data.taiwan_power_company =
          result.dataValues.ele_place?.taiwan_power_company || "";
        data.government = result.dataValues.ele_place?.government || "";
        data.test = result.dataValues.ele_place?.test || "";
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
  const {
    name,
    address,
    owner,
    cid,
    registration_member_number,
    ele_engineer,
    taiwan_power_company,
    government,
    test,
  } = req.body;
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
          registration_member_number: registration_member_number,
          ele_engineer: ele_engineer,
          taiwan_power_company: taiwan_power_company,
          government: government,
          test: test,
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
    other_description,
    customer_contacts,
    customer_services,
    ele_place_name,
    ele_place_address,
    ele_place_owner,
    registration_member_number,
    ele_engineer,
    taiwan_power_company,
    government,
    test,
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
        customer.other_description = other_description;

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
              registration_member_number: registration_member_number,
              ele_engineer: ele_engineer,
              taiwan_power_company: taiwan_power_company,
              government: government,
              test: test,
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
            console.log(registration_member_number);

            ele_place.name = ele_place_name || "";
            ele_place.address = ele_place_address || "";
            ele_place.owner = ele_place_owner || "";
            ele_place.cid = cid;
            ele_place.update_member = user?.uid;
            ele_place.registration_member_number = registration_member_number;
            ele_place.ele_engineer = ele_engineer;
            ele_place.taiwan_power_company = taiwan_power_company;
            ele_place.government = government;
            ele_place.test = test;
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

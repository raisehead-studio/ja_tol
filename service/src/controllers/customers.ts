import { Op } from "sequelize";
import e, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Customer from "../models/customer";
// import CustomerNote from "../models/customer_note";
import CustomerContact from "../models/customer_contact";
import ElePlace from "../models/ele_place";
import CustomerService from "../models/service";

import { CustomerDataType, CustomerContactDataType } from "../types/customers";

export const create_customer = (
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
  const name = req.body.name;
  const short_name = req.body.short_name;
  const customer_number = req.body.customer_number;
  const ele_number = req.body.ele_number;

  console.log(req.body);

  Customer.findOne({
    where: {
      [Op.or]: {
        customer_number: customer_number,
        ele_number: ele_number,
        name: name,
      },
    },
  }).then((customer) => {
    if (!customer) {
      Customer.create({
        name: name,
        short_name: short_name,
        customer_number: customer_number,
        ele_number: ele_number,
      })
        .then((result) => {
          res.status(201).json({
            status: 201,
            message: "customer created!",
            cid: result.dataValues.cid,
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
            return res.status(500).json({ errors: err });
          }
          next(err);
        });
    } else {
      return res.status(422).json({
        message: "duplicate customer!",
      });
    }
  });
};

export const get_customers_list = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  Customer.findAll({
    attributes: ["cid", "short_name", "customer_number", "name"],
  })
    .then((result) => {
      return res.status(201).json({
        status: 201,
        data: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        return res.status(500).json({ errors: err });
      }
      next(err);
    });
};

export const get_customers_detail = (
  req: Request,
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
        return res.status(500).json({
          status: 500,
          message: "customer not found!",
        });
      }
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

      return res.status(200).json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, errors: err });
    });
};

export const create_ele_place = (
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
  const name = req.body.name;
  const address = req.body.address;
  const owner = req.body.owner;
  const cid = req.body.cid;

  ElePlace.findOne({
    where: { name: name || "" },
  }).then((ele_place) => {
    if (!ele_place) {
      ElePlace.create({
        name: name,
        address: address,
        owner: owner,
        cid: cid,
      })
        .then((result) => {
          res.status(201).json({
            status: 201,
            message: "ele place created!",
            cid: result.dataValues.epid,
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
            return res.status(500).json({ errors: err });
          }
          next(err);
        });
    } else {
      return res.status(422).json({
        message: "duplicate ele place!",
      });
    }
  });
};

export const create_customer_contact = (
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
  const name = req.body.name;
  const type = req.body.type;
  const phone = req.body.phone;
  const job_description = req.body.job_description;
  const title = req.body.title;
  const cid = req.body.cid;
  const note = req.body.note;
  const email = req.body.email;

  CustomerContact.create({
    name: name,
    cid: cid,
    type: type,
    phone: phone,
    job_description: job_description,
    title: title,
    note: note,
    email: email,
  })
    .then((result) => {
      res.status(201).json({
        status: 201,
        message: "customer contact created!",
        cid: result.dataValues.ccid,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        return res.status(500).json({ errors: err });
      }
      next(err);
    });
};

export const update_customer_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cid = req.body.cid;
  const name = req.body.name;
  const short_name = req.body.short_name;
  const customer_number = req.body.customer_number;
  const ele_number = req.body.ele_number;
  const acceptance_check_description = req.body.acceptance_check_description;
  const factory_description = req.body.factory_description;
  const assignment_description = req.body.assignment_description;
  const tobill_description = req.body.tobill_description;
  const invoice_description = req.body.invoice_description;
  const customer_contacts = req.body.customer_contacts;
  const customer_services = req.body.customer_services;
  const ele_place_name = req.body.ele_place_name;
  const ele_place_address = req.body.ele_place_address;
  const ele_place_owner = req.body.ele_place_owner;

  Customer.findByPk(cid).then((customer: any) => {
    customer.name = name;
    customer.short_name = short_name;
    customer.customer_number = customer_number;
    customer.ele_number = ele_number;
    customer.acceptance_check_description = acceptance_check_description;
    customer.factory_description = factory_description;
    customer.assignment_description = assignment_description;
    customer.tobill_description = tobill_description;
    customer.invoice_description = invoice_description;
    customer.save();
    let executions: any = [];
    JSON.parse(customer_contacts).forEach((contact: any) => {
      executions.push(
        CustomerContact.findOne({
          where: { ccid: contact.id },
        }).then((customer_contact: any) => {
          customer_contact.name = contact.name;
          customer_contact.type = contact.type;
          customer_contact.phone = contact.phone;
          customer_contact.job_description = contact.job_description;
          customer_contact.title = contact.title;
          customer_contact.note = contact.note;
          customer_contact.email = contact.email;
          customer_contact.save();
        })
      );
    });
    JSON.parse(customer_services).forEach((service: any) => {
      executions.push(
        CustomerService.findOne({
          where: { csid: service.id },
        }).then((customer_service: any) => {
          customer_service.title = service.title;
          customer_service.notify_date = service.notify_date;
          customer_service.save();
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
        }).then(() => {
          Promise.all(executions).then(() => {
            return res.status(200).json({
              status: 200,
              message: "customer updated!",
            });
          });
        });
      } else {
        ele_place.name = ele_place_name || "";
        ele_place.address = ele_place_address || "";
        ele_place.owner = ele_place_owner || "";
        ele_place.cid = cid;
        ele_place.save();
        Promise.all(executions).then(() => {
          return res.status(200).json({
            status: 200,
            message: "customer updated!",
          });
        });
      }
    });
  });
};

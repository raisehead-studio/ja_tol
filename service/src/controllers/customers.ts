import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Customer from "../models/customer";
// import CustomerNote from "../models/customer_note";
import CustomerContact from "../models/customer_contact";
import ElePlace from "../models/ele_place";

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
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "customer not found!",
        });
      }

      data = {
        ...result.dataValues,
      };
      CustomerContact.findAll({
        where: { cid: cid },
      })
        .then((result) => {
          data.contacts = [...result.map((res) => res.dataValues)];
          ElePlace.findAll({
            where: { cid: cid },
          })
            .then((result) => {
              data.contacts = [...result.map((res) => res.dataValues)];

              return res.status(201).json({
                status: 201,
                data: result,
              });
            })
            .catch((err) => {
              return [];
            });
        })
        .catch((err) => {
          return [];
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

const update_customer_contact = (
  ccid: string,
  data: CustomerContactDataType
) => {
  const name = data.name;
  const type = data.type;
  const phone = data.phone;
  const job_description = data.job_description;
  const title = data.title;
  const note = data.note;
  const email = data.email;

  CustomerContact.findByPk(ccid).then((customer_contact: any) => {
    customer_contact.name = name;
    customer_contact.type = type;
    customer_contact.phone = phone;
    customer_contact.job_description = job_description;
    customer_contact.title = title;
    customer_contact.note = note;
    customer_contact.email = email;

    return customer_contact.save();
  });
};

export const update_customer_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cid = req.params.cid;
  const name = req.body.name;
  const short_name = req.body.short_name;
  const customer_number = req.body.customer_number;
  const ele_number = req.body.ele_number;
  const acceptance_check_description = req.body.acceptance_check_description;
  const factory_description = req.body.factory_description;
  const assignment_description = req.body.assignment_description;
  const tobill_description = req.body.tobill_description;
  const invoice_description = req.body.invoice_description;
  const contacts = req.body.contacts;

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
      return customer.save();
    })
    .then((result) => {
      if (contacts.length > 0) {
        contacts.forEach((contact: CustomerContactDataType) => {
          if (contact.ccid) {
            update_customer_contact(contact.ccid, contact);
          } else {
            create_customer_contact(req, res, next);
          }
        });
      }
    });
};

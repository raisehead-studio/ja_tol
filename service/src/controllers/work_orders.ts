import e, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import WorkOrder from "../models/work_orders";
import Customer from "../models/customer";
import Assignments from "../models/assignments";
import PowerStop from "../models/power_stop";
import ManpowerSchedule from "../models/manpower_schedule";
import AcceptanceCheck from "../models/acceptance_check";
import Factorys from "../models/factorys";
import FactoryOtherForm from "../models/factory_other_forms";
import ToBill from "../models/tobill";
import ToBillInvoice from "../models/tobill_invoce";

export const create_work_order = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      cid,
      name,
      invoice_number,
      order_number,
      type,
      amount,
      inquiry_member,
      responsible_member,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
    } = req.body;

    WorkOrder.create({
      cid,
      name,
      invoice_number,
      order_number,
      type,
      amount,
      inquiry_member,
      responsible_member,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
    })
      .then(() => {
        res.status(201).json({
          message: "Work order created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        console.log(errors);
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating work order.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating work order.",
      error: err,
    });
  }
};

export const get_work_orders_list = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    WorkOrder.findAll({
      include: {
        model: Customer,
        attributes: ["customer_number", "short_name"],
      },
    })
      .then((work_orders) => {
        res.status(200).json({
          message: "Fetched work order lists successfully.",
          data: work_orders.map((worker_order) => {
            return {
              woid: worker_order.dataValues.woid,
              cid: worker_order.dataValues.cid,
              work_order_name: worker_order.dataValues.name,
              invoice_number: worker_order.dataValues.invoice_number,
              order_number: worker_order.dataValues.order_number,
              update_date: worker_order.dataValues.update_date,
              customer_number:
                worker_order.dataValues.customer.dataValues.customer_number,
              customer_short_name:
                worker_order.dataValues.customer.dataValues.short_name,
            };
          }),
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when getting wok order lists.",
      error: err,
    });
  }
};

export const get_assignment_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { woid } = req.params;

  Assignments.findOne({
    where: { woid: woid },
    include: [
      {
        model: ManpowerSchedule,
        // attributes: [
        //   "msid",
        //   "note",
        //   "schedule_date",
        //   "started_time",
        //   "finished_time",
        //   "actual_date",
        // ],
      },
      {
        model: PowerStop,
        // attributes: [
        //   "msid",
        //   "note",
        //   "schedule_date",
        //   "started_time",
        //   "finished_time",
        //   "actual_date",
        // ],
      },
    ],
  }).then((assignment) => {
    WorkOrder.findOne({
      where: { woid: woid },
      include: [
        {
          model: Customer,
          attributes: ["customer_number", "short_name"],
        },
      ],
    }).then((work_order: any) => {
      return res.status(200).json({
        status: 200,
        data: assignment,
      });
    });
  });
  try {
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when getting assignment detail.",
      error: err,
    });
  }
};

export const create_assignment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      woid,
      manufacturing_address,
      manufacturing_status,
      manufacturing_date,
      power_stop_contact,
      power_stop_phone1,
      power_stop_phone2,
      power_stop_date,
      external_contact_is_holiday,
      external_contact_is_power_stop,
      external_contact_request_date,
      external_contact_receive_date,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      tracking_finished_date,
    } = req.body;

    Assignments.create({
      woid,
      manufacturing_address,
      manufacturing_status,
      manufacturing_date,
      power_stop_contact,
      power_stop_phone1,
      power_stop_phone2,
      power_stop_date,
      external_contact_is_holiday,
      external_contact_is_power_stop,
      external_contact_request_date,
      external_contact_receive_date,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      tracking_finished_date,
    })
      .then(() => {
        return res.status(201).json({
          message: "Assignment created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating assignment.",
          error: errors,
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating assignment.",
      error: err,
    });
  }
};

export const create_manpower_schedule = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      aid,
      note,
      schedule_date,
      started_time,
      finished_time,
      actual_date,
    } = req.body;

    ManpowerSchedule.create({
      aid,
      note,
      schedule_date,
      started_time,
      finished_time,
      actual_date,
    })
      .then(() => {
        return res.status(201).json({
          message: "Manpower schedule created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating manpower schedule.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating manpower schedule.",
      error: err,
    });
  }
};

export const create_power_stop = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { aid, area, started_date, finished_date } = req.body;
    PowerStop.create({
      aid,
      area,
      started_date,
      finished_date,
    })
      .then(() => {
        return res.status(201).json({
          message: "Power stop created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating power stop.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating power stop.",
      error: err,
    });
  }
};

export const update_assignment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const get_acceptance_check_detail = (req: Request, res: Response) => {
  try {
    AcceptanceCheck.findOne({
      where: { woid: req.params.woid },
      include: [
        {
          model: WorkOrder,
          include: [
            {
              model: Customer,
              attributes: ["customer_number", "short_name"],
            },
          ],
        },
      ],
    }).then((acceptance_check) => {
      return res.status(200).json({
        status: 200,
        data: acceptance_check,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when getting acceptance check detail.",
      error: err,
    });
  }
};

export const create_acceptance_check = (req: Request, res: Response) => {
  try {
    const {
      woid,
      description,
      is_photo_before,
      is_photo_during,
      is_photo_after,
      power_switch_date1,
      power_switch_date2,
      power_switch_date3,
      power_switch_date4,
      defect_agreement,
      report_type,
      ew06_registration,
      fom17_registration_government_date,
      fom17_registration_ele_date,
      is_warranty,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
    } = req.body;
    AcceptanceCheck.create({
      woid,
      description,
      is_photo_before,
      is_photo_during,
      is_photo_after,
      power_switch_date1,
      power_switch_date2,
      power_switch_date3,
      power_switch_date4,
      defect_agreement,
      report_type,
      ew06_registration,
      fom17_registration_government_date,
      fom17_registration_ele_date,
      is_warranty,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
    })
      .then(() => {
        return res.status(201).json({
          message: "Acceptance check created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating acceptance check.",
          error: errors,
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating acceptance check.",
      error: err,
    });
  }
};

export const get_factory_detail = (req: Request, res: Response) => {
  try {
    Factorys.findOne({
      where: { woid: req.params.woid },
      include: [
        {
          model: WorkOrder,
          include: [
            {
              model: Customer,
              attributes: ["customer_number", "short_name"],
            },
          ],
        },
        {
          model: FactoryOtherForm,
        },
      ],
    }).then((factory) => {
      return res.status(200).json({
        status: 200,
        data: factory,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when getting factory detail.",
      error: err,
    });
  }
};

export const create_factory = (req: Request, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
    } = req.body;
    Factorys.create({
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
    })
      .then(() => {
        return res.status(201).json({
          message: "Factory created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating factory.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating factory.",
      error: err,
    });
  }
};

export const create_factory_other_form = (req: Request, res: Response) => {
  try {
    const { fid, form_type, form_date, form_description } = req.body;
    FactoryOtherForm.create({
      fid,
      form_type,
      form_date,
      form_description,
    })
      .then(() => {
        return res.status(201).json({
          message: "Factory other form created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating factory other form.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating factory other form.",
      error: err,
    });
  }
};

export const get_tobill_detail = (req: Request, res: Response) => {
  try {
    ToBill.findOne({
      where: { woid: req.params.woid },
      include: [
        {
          model: WorkOrder,
          include: [
            {
              model: Customer,
              attributes: ["customer_number", "short_name"],
            },
          ],
        },
        {
          model: ToBillInvoice,
        },
      ],
    }).then((tobill) => {
      return res.status(200).json({
        status: 200,
        data: tobill,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when getting to bill detail.",
      error: err,
    });
  }
};

export const create_tobill = (req: Request, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
    } = req.body;
    ToBill.create({
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
    })
      .then(() => {
        return res.status(201).json({
          message: "To bill created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating to bill.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating to bill.",
      error: err,
    });
  }
};

export const create_tobill_invoice = (req: Request, res: Response) => {
  try {
    const {
      tbid,
      invoice_number,
      invoice_date,
      invoice_amount,
      invoice_description,
    } = req.body;
    ToBillInvoice.create({
      tbid,
      invoice_number,
      invoice_date,
      invoice_amount,
      invoice_description,
    })
      .then(() => {
        return res.status(201).json({
          message: "To bill invoice created successfully",
          status: 200,
        });
      })
      .catch((errors) => {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when creating to bill invoice.",
          error: errors?.errors.map((err: any) => err.message),
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when creating to bill invoice.",
      error: err,
    });
  }
};

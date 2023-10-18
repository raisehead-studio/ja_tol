import { Request, Response, NextFunction } from "express";

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
import {
  WorkOrderRequestDataType,
  WorkOrderResponseDataType,
} from "../types/work_order";

export const create_work_order = (req: Request, res: Response) => {
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
              id: worker_order.dataValues.woid,
              work_order_name: worker_order.dataValues.name,
              invoice_number: worker_order.dataValues.invoice_number,
              order_number: worker_order.dataValues.order_number,
              update_date: worker_order.dataValues.updatedAt,
              customer_number:
                worker_order.dataValues.customer.dataValues.customer_number,
              customer_name:
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

export const get_assignment_detail = (req: Request, res: Response) => {
  const { woid } = req.params;

  Assignments.findOne({
    where: { woid: woid },
    include: [
      {
        model: ManpowerSchedule,
        attributes: [
          "msid",
          "note",
          "schedule_date",
          "started_time",
          "finished_time",
          "actual_date",
        ],
      },
      {
        model: PowerStop,
        attributes: ["psid", "area", "started_date", "finished_date"],
      },
    ],
  }).then((assignment) => {
    WorkOrder.findOne({
      where: { woid: woid },
      attributes: [
        "name",
        "type",
        "po",
        "acceptance_check_date",
        "tobill_date",
        "factory_date",
        "assignment_date",
      ],
      include: [
        {
          model: Customer,
          attributes: ["customer_number", "short_name"],
        },
      ],
    }).then((work_order: any) => {
      if (!assignment) {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when getting assignment detail.",
        });
      }
      let data: any = {};
      data.id = assignment?.dataValues.aid;
      data.manufacturing_address = assignment?.dataValues.manufacturing_address;
      data.manufacturing_status = assignment?.dataValues.manufacturing_status;
      data.manufacturing_date = assignment?.dataValues.manufacturing_date;
      data.power_stop_contact = assignment?.dataValues.power_stop_contact;
      data.power_stop_phone1 = assignment?.dataValues.power_stop_phone1;
      data.power_stop_phone2 = assignment?.dataValues.power_stop_phone2;
      data.power_stop_date = assignment?.dataValues.power_stop_date;
      data.external_contact_is_holiday =
        assignment?.dataValues.external_contact_is_holiday;
      data.external_contact_is_power_stop =
        assignment?.dataValues.external_contact_is_power_stop;
      data.external_contact_request_date =
        assignment?.dataValues.external_contact_request_date;
      data.external_contact_receive_date =
        assignment?.dataValues.external_contact_receive_date;
      data.tracking_date = assignment?.dataValues.tracking_date;
      data.tracking_description = assignment?.dataValues.tracking_description;
      data.tracking_is_finished = assignment?.dataValues.tracking_is_finished;
      data.tracking_finished_date =
        assignment?.dataValues.tracking_finished_date;
      data.work_order_name = work_order.dataValues.name;
      data.work_order_type = work_order.dataValues.type;
      data.po = work_order.dataValues.po;
      data.acceptance_check_date = work_order.dataValues.acceptance_check_date;
      data.tobill_date = work_order.dataValues.tobill_date;
      data.factory_date = work_order.dataValues.factory_date;
      data.assignment_date = work_order.dataValues.assignment_date;
      data.customer_number =
        work_order.dataValues.customer.dataValues.customer_number;
      data.customer_name = work_order.dataValues.customer.dataValues.short_name;
      data.manpower_schedule = assignment?.dataValues.manpower_schedules.map(
        (manpower_schedule: any) => {
          return {
            id: manpower_schedule.dataValues.msid,
            note: manpower_schedule.dataValues.note,
            schedule_date: manpower_schedule.dataValues.schedule_date,
            started_time: manpower_schedule.dataValues.started_time,
            finished_time: manpower_schedule.dataValues.finished_time,
            actual_date: manpower_schedule.dataValues.actual_date,
          };
        }
      );
      data.power_stop = assignment?.dataValues.power_stops.map(
        (power_stop: any) => {
          return {
            id: power_stop.dataValues.psid,
            area: power_stop.dataValues.area,
            started_time: power_stop.dataValues.started_date,
            finished_time: power_stop.dataValues.finished_date,
          };
        }
      );

      return res.status(200).json({
        status: 200,
        data: data,
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

export const update_assignment = (req: Request, res: Response) => {
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
      work_order_name,
      work_order_type,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
      manpower_schedule,
      power_stop,
    } = req.body;

    Assignments.findOne({
      where: { woid: woid },
    }).then((assignment: any) => {
      assignment.manufacturing_address = manufacturing_address;
      assignment.manufacturing_status = manufacturing_status;
      assignment.manufacturing_date = manufacturing_date;
      assignment.power_stop_contact = power_stop_contact;
      assignment.power_stop_phone1 = power_stop_phone1;
      assignment.power_stop_phone2 = power_stop_phone2;
      assignment.power_stop_date = power_stop_date;
      assignment.external_contact_is_holiday = external_contact_is_holiday;
      assignment.external_contact_is_power_stop =
        external_contact_is_power_stop;
      assignment.external_contact_request_date = external_contact_request_date;
      assignment.external_contact_receive_date = external_contact_receive_date;
      assignment.tracking_date = tracking_date;
      assignment.tracking_description = tracking_description;
      assignment.tracking_is_finished = tracking_is_finished;
      assignment.tracking_finished_date = tracking_finished_date;

      assignment.save();
      WorkOrder.findOne({
        where: { woid: woid },
      }).then((work_order: any) => {
        work_order.name = work_order_name;
        work_order.type = work_order_type;
        work_order.po = po;
        work_order.acceptance_check_date = acceptance_check_date;
        work_order.tobill_date = tobill_date;
        work_order.factory_date = factory_date;
        work_order.assignment_date = assignment_date;
        work_order.save();

        let executions: any = [];
        JSON.parse(manpower_schedule).forEach((manpower_schedule_item: any) => {
          executions.push(
            ManpowerSchedule.findOne({
              where: { msid: manpower_schedule_item.id },
            }).then((manpower_schedule: any) => {
              manpower_schedule.note = manpower_schedule_item.note;
              manpower_schedule.schedule_date =
                manpower_schedule_item.schedule_date;
              manpower_schedule.started_time =
                manpower_schedule_item.started_time;
              manpower_schedule.finished_time =
                manpower_schedule_item.finished_time;
              manpower_schedule.actual_date =
                manpower_schedule_item.actual_date;
              manpower_schedule.save();
            })
          );
        });

        JSON.parse(power_stop).forEach((power_stop_item: any) => {
          executions.push(
            PowerStop.findOne({
              where: { psid: power_stop_item.id },
            }).then((power_stop: any) => {
              power_stop.area = power_stop_item.area;
              power_stop.started_date = power_stop_item.started_date;
              power_stop.finished_date = power_stop_item.finished_date;
              power_stop.save();
            })
          );
        });

        Promise.all(executions).then(() => {
          return res.status(200).json({
            status: 200,
            message: "Assignment updated successfully",
          });
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when updating assignment.",
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

export const update_acceptance_check = (req: Request, res: Response) => {
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
      work_order_name,
      work_order_type,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
    } = req.body;

    AcceptanceCheck.findOne({
      where: { woid: woid },
    }).then((acceptance_check: any) => {
      acceptance_check.description = description;
      acceptance_check.is_photo_before = is_photo_before;
      acceptance_check.is_photo_during = is_photo_during;
      acceptance_check.is_photo_after = is_photo_after;
      acceptance_check.power_switch_date1 = power_switch_date1;
      acceptance_check.power_switch_date2 = power_switch_date2;
      acceptance_check.power_switch_date3 = power_switch_date3;
      acceptance_check.power_switch_date4 = power_switch_date4;
      acceptance_check.defect_agreement = defect_agreement;
      acceptance_check.report_type = report_type;
      acceptance_check.ew06_registration = ew06_registration;
      acceptance_check.fom17_registration_government_date =
        fom17_registration_government_date;
      acceptance_check.fom17_registration_ele_date =
        fom17_registration_ele_date;
      acceptance_check.is_warranty = is_warranty;
      acceptance_check.tracking_date = tracking_date;
      acceptance_check.tracking_description = tracking_description;
      acceptance_check.tracking_is_finished = tracking_is_finished;
      acceptance_check.finished_date = finished_date;
      acceptance_check.wt_report_number = wt_report_number;
      acceptance_check.save();
      WorkOrder.findOne({
        where: { woid: woid },
      }).then((work_order: any) => {
        work_order.name = work_order_name;
        work_order.type = work_order_type;
        work_order.po = po;
        work_order.acceptance_check_date = acceptance_check_date;
        work_order.tobill_date = tobill_date;
        work_order.factory_date = factory_date;
        work_order.assignment_date = assignment_date;
        work_order.save();

        return res.status(200).json({
          status: 200,
          message: "Acceptance check updated successfully",
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when updating acceptance check.",
      error: err,
    });
  }
};

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
      if (!acceptance_check) {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when getting acceptance check detail.",
        });
      }
      let data: any = {};
      data.id = acceptance_check?.dataValues.acid;
      data.description = acceptance_check?.dataValues.description;
      data.is_photo_before = acceptance_check?.dataValues.is_photo_before;
      data.is_photo_during = acceptance_check?.dataValues.is_photo_during;
      data.is_photo_after = acceptance_check?.dataValues.is_photo_after;
      data.power_switch_date1 = acceptance_check?.dataValues.power_switch_date1;
      data.power_switch_date2 = acceptance_check?.dataValues.power_switch_date2;
      data.power_switch_date3 = acceptance_check?.dataValues.power_switch_date3;
      data.power_switch_date4 = acceptance_check?.dataValues.power_switch_date4;
      data.defect_agreement = acceptance_check?.dataValues.defect_agreement;
      data.report_type = acceptance_check?.dataValues.report_type;
      data.ew06_registration = acceptance_check?.dataValues.ew06_registration;
      data.fom17_registration_government_date =
        acceptance_check?.dataValues.fom17_registration_government_date;
      data.fom17_registration_ele_date =
        acceptance_check?.dataValues.fom17_registration_ele_date;
      data.is_warranty = acceptance_check?.dataValues.is_warranty;
      data.tracking_date = acceptance_check?.dataValues.tracking_date;
      data.tracking_description =
        acceptance_check?.dataValues.tracking_description;
      data.tracking_is_finished =
        acceptance_check?.dataValues.tracking_is_finished;
      data.finished_date = acceptance_check?.dataValues.finished_date;
      data.wt_report_number = acceptance_check?.dataValues.wt_report_number;
      data.work_order_name =
        acceptance_check?.dataValues.work_order.dataValues.name;
      data.work_order_type =
        acceptance_check?.dataValues.work_order.dataValues.type;
      data.po = acceptance_check?.dataValues.work_order.dataValues.po;
      data.acceptance_check_date =
        acceptance_check?.dataValues.work_order.dataValues.acceptance_check_date;
      data.tobill_date =
        acceptance_check?.dataValues.work_order.dataValues.tobill_date;
      data.factory_date =
        acceptance_check?.dataValues.work_order.dataValues.factory_date;
      data.assignment_date =
        acceptance_check?.dataValues.work_order.dataValues.assignment_date;
      data.customer_number =
        acceptance_check?.dataValues.work_order.dataValues.customer.dataValues.customer_number;
      data.customer_name =
        acceptance_check?.dataValues.work_order.dataValues.customer.dataValues.short_name;

      return res.status(200).json({
        status: 200,
        data: data,
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
      if (!factory) {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when getting factory detail.",
        });
      }
      let data: any = {};
      data.id = factory?.dataValues.fid;
      data.description = factory?.dataValues.description;
      data.tracking_date = factory?.dataValues.tracking_date;
      data.tracking_description = factory?.dataValues.tracking_description;
      data.tracking_is_finished = factory?.dataValues.tracking_is_finished;
      data.finished_date = factory?.dataValues.finished_date;
      data.wt_report_number = factory?.dataValues.wt_report_number;
      data.work_order_name = factory?.dataValues.work_order.dataValues.name;
      data.work_order_type = factory?.dataValues.work_order.dataValues.type;
      data.po = factory?.dataValues.work_order.dataValues.po;
      data.acceptance_check_date =
        factory?.dataValues.work_order.dataValues.acceptance_check_date;
      data.tobill_date = factory?.dataValues.work_order.dataValues.tobill_date;
      data.factory_date =
        factory?.dataValues.work_order.dataValues.factory_date;
      data.assignment_date =
        factory?.dataValues.work_order.dataValues.assignment_date;
      data.customer_number =
        factory?.dataValues.work_order.dataValues.customer.dataValues.customer_number;
      data.customer_name =
        factory?.dataValues.work_order.dataValues.customer.dataValues.short_name;
      data.factory_other_form = factory?.dataValues.factory_other_forms.map(
        (factory_other_form: any) => {
          return {
            id: factory_other_form.dataValues.foid,
            is_class: factory_other_form.dataValues.is_class,
            is_bunny_shoe: factory_other_form.dataValues.is_bunny_shoe,
            is_bunny_suit: factory_other_form.dataValues.is_bunny_suit,
            is_group_insurance:
              factory_other_form.dataValues.is_group_insurance,
            is_label_insurance:
              factory_other_form.dataValues.is_label_insurance,
            other_form: factory_other_form.dataValues.other_form,
          };
        }
      );

      return res.status(200).json({
        status: 200,
        data: data,
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

export const update_factory = (req: Request, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
      work_order_name,
      work_order_type,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
      factory_other_form,
    } = req.body;

    Factorys.findOne({
      where: { woid: woid },
    }).then((factory: any) => {
      factory.description = description;
      factory.tracking_date = tracking_date;
      factory.tracking_description = tracking_description;
      factory.tracking_is_finished = tracking_is_finished;
      factory.finished_date = finished_date;
      factory.save();

      WorkOrder.findOne({
        where: { woid: woid },
      }).then((work_order: any) => {
        work_order.name = work_order_name;
        work_order.type = work_order_type;
        work_order.po = po;
        work_order.acceptance_check_date = acceptance_check_date;
        work_order.tobill_date = tobill_date;
        work_order.factory_date = factory_date;
        work_order.assignment_date = assignment_date;
        work_order.wt_report_number = wt_report_number;
        work_order.save();

        let executions: any = [];
        JSON.parse(factory_other_form).forEach(
          (factory_other_form_item: any) => {
            executions.push(
              FactoryOtherForm.findOne({
                where: { foid: factory_other_form_item.id },
              }).then((factory_other_form: any) => {
                factory_other_form.is_class = factory_other_form_item.is_class;
                factory_other_form.is_bunny_shoe =
                  factory_other_form_item.is_bunny_shoe;
                factory_other_form.is_bunny_suit =
                  factory_other_form_item.is_bunny_suit;
                factory_other_form.is_group_insurance =
                  factory_other_form_item.is_group_insurance;
                factory_other_form.is_label_insurance =
                  factory_other_form_item.is_label_insurance;
                factory_other_form.other_form =
                  factory_other_form_item.other_form;
                factory_other_form.save();
              })
            );
          }
        );

        Promise.all(executions).then(() => {
          return res.status(200).json({
            status: 200,
            message: "Factory updated successfully",
          });
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when updating factory.",
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
    const {
      fid,
      is_class,
      is_bunny_shoe,
      is_bunny_suit,
      is_group_insurance,
      is_label_insurance,
      other_form,
    } = req.body;
    FactoryOtherForm.create({
      fid,
      is_class,
      is_bunny_shoe,
      is_bunny_suit,
      is_group_insurance,
      is_label_insurance,
      other_form,
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

export const update_tobill = (req: Request, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
      work_order_name,
      work_order_type,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
      tobill_invoice,
    } = req.body;
    ToBill.findOne({
      where: { woid: woid },
    }).then((tobill: any) => {
      tobill.description = description;
      tobill.tracking_date = tracking_date;
      tobill.tracking_description = tracking_description;
      tobill.tracking_is_finished = tracking_is_finished;
      tobill.finished_date = finished_date;
      tobill.save();

      WorkOrder.findOne({
        where: { woid: woid },
      }).then((work_order: any) => {
        work_order.name = work_order_name;
        work_order.type = work_order_type;
        work_order.po = po;
        work_order.acceptance_check_date = acceptance_check_date;
        work_order.tobill_date = tobill_date;
        work_order.factory_date = factory_date;
        work_order.assignment_date = assignment_date;
        work_order.wt_report_number = wt_report_number;
        work_order.save();

        let executions: any = [];
        JSON.parse(tobill_invoice).forEach((tobill_invoice_item: any) => {
          executions.push(
            ToBillInvoice.findOne({
              where: { tbiid: tobill_invoice_item.id },
            }).then((tobill_invoice: any) => {
              tobill_invoice.percentage = tobill_invoice_item.percentage;
              tobill_invoice.date = tobill_invoice_item.date;
              tobill_invoice.amount = tobill_invoice_item.amount;
              tobill_invoice.sent_date = tobill_invoice_item.sent_date;
              tobill_invoice.note = tobill_invoice_item.note;
              tobill_invoice.numbers_invoices =
                tobill_invoice_item.numbers_invoices;
              tobill_invoice.numbers_reports =
                tobill_invoice_item.numbers_reports;
              tobill_invoice.numbers_general_forms =
                tobill_invoice_item.numbers_general_forms;
              tobill_invoice.numbers_inqualify_agreements =
                tobill_invoice_item.numbers_inqualify_agreements;
              tobill_invoice.invoice_number =
                tobill_invoice_item.invoice_number;
              tobill_invoice.save();
            })
          );
        });

        Promise.all(executions).then(() => {
          return res.status(200).json({
            status: 200,
            message: "Tobill updated successfully",
          });
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "something went wrong when updating to bill.",
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
      if (!tobill) {
        return res.status(500).json({
          status: 500,
          message: "something went wrong when getting to bill detail.",
        });
      }
      console.log(tobill?.dataValues);

      let data: any = {};
      data.id = tobill?.dataValues.tbid;
      data.description = tobill?.dataValues.description;
      data.tracking_date = tobill?.dataValues.tracking_date;
      data.tracking_description = tobill?.dataValues.tracking_description;
      data.tracking_is_finished = tobill?.dataValues.tracking_is_finished;
      data.finished_date = tobill?.dataValues.finished_date;
      data.wt_report_number = tobill?.dataValues.wt_report_number;
      data.work_order_name = tobill?.dataValues.work_order.dataValues.name;
      data.work_order_type = tobill?.dataValues.work_order.dataValues.type;
      data.po = tobill?.dataValues.work_order.dataValues.po;
      data.acceptance_check_date =
        tobill?.dataValues.work_order.dataValues.acceptance_check_date;
      data.tobill_date = tobill?.dataValues.work_order.dataValues.tobill_date;
      data.factory_date = tobill?.dataValues.work_order.dataValues.factory_date;
      data.assignment_date =
        tobill?.dataValues.work_order.dataValues.assignment_date;
      data.customer_number =
        tobill?.dataValues.work_order.dataValues.customer.dataValues.customer_number;
      data.customer_name =
        tobill?.dataValues.work_order.dataValues.customer.dataValues.short_name;
      data.tobill_invoice = tobill?.dataValues.tobill_invoces.map(
        (tobill_invoice: any) => {
          return {
            id: tobill_invoice.dataValues.tbiid,
            percentage: tobill_invoice.dataValues.percentage,
            date: tobill_invoice.dataValues.date,
            amount: tobill_invoice.dataValues.amount,
            sent_date: tobill_invoice.dataValues.sent_date,
            note: tobill_invoice.dataValues.note,
            numbers_invoices: tobill_invoice.dataValues.numbers_invoices,
            numbers_reports: tobill_invoice.dataValues.numbers_reports,
            numbers_general_forms:
              tobill_invoice.dataValues.numbers_general_forms,
            numbers_inqualify_agreements:
              tobill_invoice.dataValues.numbers_inqualify_agreements,
            invoice_number: tobill_invoice.dataValues.invoice_number,
          };
        }
      );

      return res.status(200).json({
        status: 200,
        data: data,
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
      percentage,
      date,
      amount,
      sent_date,
      note,
      numbers_invoices,
      numbers_reports,
      numbers_general_forms,
      numbers_inqualify_agreements,
      invoice_number,
    } = req.body;
    ToBillInvoice.create({
      tbid,
      percentage,
      date,
      amount,
      sent_date,
      note,
      numbers_invoices,
      numbers_reports,
      numbers_general_forms,
      numbers_inqualify_agreements,
      invoice_number,
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

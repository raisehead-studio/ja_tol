import e, { Request, Response, NextFunction } from "express";

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
import ElePlace from "../models/ele_place";
import User from "../models/user";
import {
  WorkOrderRequestDataType,
  WorkOrderResponseDataType,
} from "../types/work_order";

interface RequestWithUser extends Request {
  user?: {
    name: string;
    uid: string;
  };
}

export const create_work_order = async (
  req: RequestWithUser,
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
      price,
    } = req.body;
    const { user } = req;
    const ele = await ElePlace.findOne({
      where: { cid: cid },
    });

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
      price,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then((result) => {
        let executions: any = [];
        let woid = result.dataValues.woid;
        let description = "";
        let tracking_date = null;
        let tracking_description = "";
        let tracking_is_finished = false;
        let finished_date = new Date();
        let is_photo_before = false;
        let is_photo_during = false;
        let is_photo_after = false;
        let power_switch_date1 = null;
        let power_switch_date2 = null;
        let power_switch_date3 = null;
        let power_switch_date4 = null;
        let defect_agreement = false;
        let report_type = new Date();
        let ew06_registration = false;
        let fom17_registration_government_date = new Date();
        let fom17_registration_ele_date = new Date();
        let is_warranty = false;
        let warranty_number = "";
        let warranty_started_date = null;
        let warranty_end_date = null;
        let wt_report_number = "";
        let manufacturing_address = ele?.dataValues.address;
        let manufacturing_status = "不需備料";
        let manufacturing_date = null;
        let power_stop_contact = "";
        let power_stop_phone1 = "";
        let power_stop_phone2 = "";
        let power_stop_date = new Date();
        let external_contact_is_holiday = false;
        let external_contact_is_power_stop = false;
        let external_contact_request_date = new Date();
        let external_contact_receive_date = new Date();
        // let finished_date = new Date();

        executions.push(
          Factorys.create({
            woid,
            description,
            tracking_date,
            tracking_description,
            tracking_is_finished,
            is_class: false,
            is_group_insurance: false,
            is_label_insurance: false,
            is_bunny_shoe: false,
            is_bunny_suit: false,
            update_member: user?.uid,
            create_membe: user?.uid,
            is_del: false,
          })
            .then(() => {})
            .catch((err) => {
              return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `建立工單資料時發生問題。 ${err}`,
              });
              next();
            })
        );

        executions.push(
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
            warranty_number,
            warranty_started_date,
            warranty_end_date,
            tracking_date,
            tracking_description,
            tracking_is_finished,
            wt_report_number,
            update_member: user?.uid,
            create_member: user?.uid,
            is_del: false,
            photo_download: "",
            photo_download_date: null,
          })
            .then(() => {})
            .catch((err) => {
              return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `建立工單資料時發生問題。 ${err}`,
              });
              next();
            })
        );

        executions.push(
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
            update_member: user?.uid,
            create_member: user?.uid,
            is_del: false,
          })
            .then(() => {})
            .catch((err) => {
              return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `建立工單資料時發生問題。 ${err}`,
              });
              next();
            })
        );

        executions.push(
          ToBill.create({
            woid,
            description,
            tracking_date,
            tracking_description,
            tracking_is_finished,
            update_member: user?.uid,
            create_member: user?.uid,
            is_del: false,
          })
            .then(() => {})
            .catch((err) => {
              return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `建立工單資料時發生問題。 ${err}`,
              });
              next();
            })
        );

        Promise.all(executions)
          .then(() => {
            return res.json({
              code: 200,
              status: "success",
              data: {
                woid,
              },
              message: "建立工單資料成功",
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `建立工單資料時發生問題。 ${err}`,
            });
            next();
          });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立工單資料時發生問題。 ${err}`,
        });
        next(err);
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立工單資料時發生問題。 ${err}`,
    });
    next(err);
  }
};

export const get_work_orders_list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orderBy, orderType } = req.query;

  const users: any = await User.findAll({ where: { is_del: false } });
  try {
    WorkOrder.findAll({
      where: { is_del: false },
      include: [
        {
          model: Customer,
          attributes: ["customer_number", "short_name"],
          include: [
            {
              model: ElePlace,
              attributes: ["test"],
            },
          ],
        },
        {
          model: AcceptanceCheck,
        },
        {
          model: Assignments,
          attributes: [
            "manufacturing_date",
            "aid",
            "is_assign_manpower",
            "finished_date",
            "tracking_is_finished",
            "tracking_description",
          ],
          include: [
            {
              model: ManpowerSchedule,
              attributes: ["started_time", "actual_date"],
              order: [["started_time", "ASC"]],
              limit: 1,
            },
            {
              model: PowerStop,
              attributes: ["receive_date", "tai_power_notify_date"],
            },
          ],
        },
        {
          model: ToBill,
          attributes: [
            "finished_date",
            "tracking_is_finished",
            "tracking_description",
            "finished_date",
          ],
        },
        {
          model: Factorys,
          attributes: [
            "finished_date",
            "tracking_is_finished",
            "tracking_description",
          ],
        },
      ],
    })
      .then((work_orders) => {
        let data;
        data = work_orders.map((worker_order) => {
          const {
            power_switch_date1,
            power_switch_date2,
            power_switch_date3,
            power_switch_date4,
          } = worker_order.dataValues.acceptance_check?.dataValues;
          let item_data;
          let report_status;

          console.log(worker_order.dataValues.acceptance_check?.dataValues);

          if (
            !worker_order.dataValues.assignment.dataValues.tracking_is_finished
          ) {
            item_data = "112WT0268派工";
          } else {
            if (
              !worker_order.dataValues.factory.dataValues.tracking_is_finished
            ) {
              item_data = "112WT0187入廠";
            } else {
              if (
                !worker_order.dataValues.acceptance_check.dataValues
                  .tracking_is_finished
              ) {
                item_data = "112WT0268驗收";
              } else {
                if (
                  !worker_order.dataValues.tobill.dataValues
                    .tracking_is_finished
                ) {
                  item_data = "112WT0551請款";
                }
              }
            }
          }

          if (power_switch_date4) {
            report_status = power_switch_date4;
          } else {
            if (power_switch_date3) {
              report_status = power_switch_date3;
            } else {
              if (power_switch_date2) {
                report_status = power_switch_date2;
              } else {
                if (power_switch_date1) {
                  report_status = power_switch_date1;
                } else {
                  report_status = null;
                }
              }
            }
          }
          // switch (report_status) {
          //   case power_switch_date4:
          //     report_status = power_switch_date4;
          //     break;
          //   case power_switch_date3:
          //     report_status = power_switch_date3;
          //     break;
          //   case power_switch_date2:
          //     report_status = power_switch_date2;
          //     break;
          //   case power_switch_date1:
          //     report_status = power_switch_date1;
          //     break;
          //   default:
          //     report_status = null;
          //     break;
          // }

          return {
            id: worker_order?.dataValues.woid,
            notify_date: new Date(),
            customer_number:
              worker_order?.dataValues.customer.dataValues.customer_number,
            customer_name:
              worker_order?.dataValues.customer.dataValues.short_name,
            order_number: worker_order?.dataValues.order_number,
            work_order_name: worker_order?.dataValues.name,
            manufacturing_date:
              worker_order?.dataValues.assignment.manufacturing_date,
            manpower_schedule_started_time:
              worker_order?.dataValues.assignment.manpower_schedules.length > 0
                ? worker_order.dataValues.assignment.manpower_schedules.sort(
                    (a: any, b: any) => b.started_time - a.started_time
                  )[0].started_time
                : null,
            manpower_schedule_actual_date:
              worker_order?.dataValues.assignment.manpower_schedules.length > 0
                ? worker_order.dataValues.assignment.manpower_schedules.sort(
                    (a: any, b: any) => b.started_time - a.started_time
                  )[0].actual_date
                : null,
            receive_date:
              worker_order?.dataValues.assignment.power_stops?.receive_date,
            tai_power_notify_date:
              worker_order?.dataValues.assignment.power_stops
                ?.tai_power_notify_date,
            is_assign_manpower:
              worker_order?.dataValues.assignment.dataValues.is_assign_manpower,
            factory_tracking_date:
              worker_order?.dataValues.factory.finished_date,
            report_status: report_status,
            photo_download:
              worker_order?.dataValues.acceptance_check.photo_download_date,
            acceptance_check_tracking_date:
              worker_order?.dataValues.acceptance_check.finished_date,
            tobill_tracking_date: worker_order.dataValues.tobill.finished_date,
            update_member: users.filter(
              (user: any) => worker_order?.dataValues.update_member === user.uid
            )[0].name,
            update_date: worker_order?.dataValues.updatedAt,
            tobill_finished_date: worker_order?.dataValues.tobill.finished_date,
            test: worker_order?.dataValues.customer.ele_place?.test,
            // started_time:
            //   worker_order.dataValues.assignment.manpower_schedules.length > 0
            //     ? worker_order.dataValues.assignment.manpower_schedules[0]
            //         .dataValues.started_time
            //     : null,
            // status: [""],
            // is_inspection_report_retrieved_date:
            //   worker_order.dataValues.acceptance_check.dataValues
            //     .is_inspection_report_retrieved_date,
            // item_data: item_data || null,
          };
        });

        if (orderBy && orderType) {
          if (
            orderBy === "update_date" ||
            orderBy === "notify_date" ||
            orderBy === "manufacturing_date" ||
            orderBy === "manpower_schedule_started_time" ||
            orderBy === "manpower_schedule_actual_date" ||
            orderBy === "receive_date" ||
            orderBy === "tai_power_notify_date" ||
            orderBy === "factory_tracking_date" ||
            orderBy === "acceptance_check_tracking_date" ||
            orderBy === "tobill_tracking_date"
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
                return a[orderBy.toString()].localeCompare(
                  b[orderBy.toString()]
                );
              } else {
                return b[orderBy.toString()].localeCompare(
                  a[orderBy.toString()]
                );
              }
            });
          }
        }

        return res.json({
          code: 200,
          status: "success",
          data: data,
          message: "取得工單資料列表成功",
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `取得工單資料列表時發生問題。 ${err}`,
        });

        next(err);
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得工單資料列表時發生問題。 ${err}`,
    });
  }
};

export const get_work_order_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { woid } = req.params;
  try {
    WorkOrder.findOne({
      where: { woid: woid },
      include: [
        {
          model: Assignments,
        },
        {
          model: AcceptanceCheck,
        },
        {
          model: ToBill,
        },
        {
          model: Factorys,
        },
        {
          model: Customer,
          attributes: ["customer_number", "short_name", "cid"],
        },
      ],
    })
      .then(async (work_order: any) => {
        let work_order_data: any;
        work_order_data = work_order.dataValues;
        return res.json({
          code: 200,
          status: "success",
          data: {
            ...work_order_data,
            assign_finished_date:
              work_order?.dataValues.assignment?.dataValues.finished_date ||
              null,
            acceptance_check_finished_date:
              work_order?.dataValues.acceptance_check?.dataValues
                .finished_date || null,
            to_bill_finished_date:
              work_order?.dataValues.tobill?.dataValues.finished_date || null,
            factory_finished_date:
              work_order?.dataValues.factory?.dataValues.finished_date || null,
          },
          message: "取得工單資料成功",
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `取得工單資料時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得工單資料時發生問題。 ${err}`,
    });
  }
};

export const update_work_order_detail = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      woid,
      // name,
      // invoice_number,
      // order_number,
      type,
      // amount,
      // inquiry_member,
      // responsible_member,
      po,
      acceptance_check_date,
      tobill_date,
      factory_date,
      assignment_date,
      price,
    } = req.body;
    const { user } = req;

    WorkOrder.findOne({ where: { woid: woid } })
      .then((work: any) => {
        try {
          // work.name = name;
          // work.invoice_number = invoice_number;
          // work.order_number = order_number;
          work.type = type;
          // work.amount = amount;
          // work.inquiry_member = inquiry_member;
          // work.responsible_member = responsible_member;
          work.po = po;
          work.acceptance_check_date = acceptance_check_date;
          work.tobill_date = tobill_date;
          work.factory_date = factory_date;
          work.assignment_date = assignment_date;
          work.update_member = user?.uid;
          work.price = price;
          work.save();

          return res.json({
            code: 200,
            status: "success",
            data: null,
            message: `更新工單資料成功。`,
          });
        } catch (err) {
          return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新工單資料時發生問題。 ${err}`,
          });
        }
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `更新工單資料時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新工單資料時發生問題。 ${err}`,
    });
  }
};

export const get_assignment_detail = (req: Request, res: Response) => {
  const { woid } = req.params;
  try {
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
          attributes: [
            "psid",
            "area",
            "other_description",
            "stop_shift",
            "request_date",
            "receive_date",
            "engineer",
            "customer",
            "tai_power_area",
            "tai_power_notify_date",
            "is_holiday",
          ],
        },
      ],
    })
      .then((assignment) => {
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
              attributes: [
                "customer_number",
                "short_name",
                "cid",
                "assignment_description",
              ],
            },
          ],
        })
          .then(async (work_order: any) => {
            const ele = await ElePlace.findOne({
              where: {
                cid: work_order.customer.dataValues.cid,
              },
            });

            let data: any = {};
            data.description =
              work_order.customer.dataValues.assignment_description;
            data.id = assignment?.dataValues.aid;
            data.manufacturing_address =
              assignment?.dataValues.manufacturing_address;
            data.manufacturing_status =
              assignment?.dataValues.manufacturing_status;
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
            data.tracking_description =
              assignment?.dataValues.tracking_description;
            data.tracking_is_finished =
              assignment?.dataValues.tracking_is_finished;
            data.finished_date = assignment?.dataValues.finished_date;
            data.work_order_name = work_order.dataValues.name;
            data.work_order_type = work_order.dataValues.type;
            data.po = work_order.dataValues.po;
            data.acceptance_check_date =
              work_order.dataValues.acceptance_check_date;
            data.tobill_date = work_order.dataValues.tobill_date;
            data.factory_date = work_order.dataValues.factory_date;
            data.assignment_date = work_order.dataValues.assignment_date;
            data.customer_number =
              work_order.dataValues.customer.dataValues.customer_number;
            data.customer_name =
              work_order.dataValues.customer.dataValues.short_name;
            data.is_assign_manpower = assignment?.dataValues.is_assign_manpower;
            data.is_adjusted =
              ele?.dataValues.address ===
              assignment?.dataValues.manufacturing_address
                ? false
                : true;
            data.manpower_schedule =
              assignment?.dataValues.manpower_schedules.map(
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
                  stop_shift: power_stop.dataValues.stop_shift,
                  other_description: power_stop.dataValues.other_description,
                  request_date: power_stop.dataValues.request_date,
                  receive_date: power_stop.dataValues.receive_date,
                  engineer: power_stop.dataValues.engineer,
                  customer: power_stop.dataValues.customer,
                  tai_power_area: power_stop.dataValues.tai_power_area,
                  tai_power_notify_date:
                    power_stop.dataValues.tai_power_notify_date,
                  is_holiday: power_stop.dataValues.is_holiday,
                };
              }
            );

            return res.json({
              code: 200,
              status: "success",
              data: data,
              message: `取得派工資料成功。`,
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `取得派工資料時發生問題 ${err}`,
            });
          });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `取得派工資料時發生問題 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得派工資料時發生問題 ${err}`,
    });
  }
};

export const update_assignment = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      woid,
      manufacturing_address,
      manufacturing_status,
      manufacturing_date,
      // power_stop_contact,
      // power_stop_phone1,
      // power_stop_phone2,
      // power_stop_date,
      external_contact_is_holiday,
      external_contact_is_power_stop,
      external_contact_request_date,
      external_contact_receive_date,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      // work_order_name,
      // work_order_type,
      // po,
      // acceptance_check_date,
      // tobill_date,
      // factory_date,
      // assignment_date,
      manpower_schedule,
      power_stop,
      is_assign_manpower,
    } = req.body;
    const { user } = req;

    Assignments.findOne({
      where: { woid: woid },
    })
      .then((assignment: any) => {
        assignment.manufacturing_address = manufacturing_address;
        assignment.manufacturing_status = manufacturing_status;
        assignment.manufacturing_date = manufacturing_date;
        // assignment.power_stop_contact = power_stop_contact;
        // assignment.power_stop_phone1 = power_stop_phone1;
        // assignment.power_stop_phone2 = power_stop_phone2;
        // assignment.power_stop_date = power_stop_date;
        assignment.external_contact_is_holiday = external_contact_is_holiday;
        assignment.external_contact_is_power_stop =
          external_contact_is_power_stop;
        assignment.external_contact_request_date =
          external_contact_request_date;
        assignment.external_contact_receive_date =
          external_contact_receive_date;
        assignment.tracking_date = tracking_date;
        assignment.tracking_description = tracking_description;
        assignment.tracking_is_finished = tracking_is_finished;
        assignment.finished_date = finished_date;
        assignment.update_member = user?.uid;
        assignment.is_assign_manpower = is_assign_manpower;
        assignment.save();

        let executions: any = [];

        if (manpower_schedule) {
          JSON.parse(manpower_schedule).forEach(
            (manpower_schedule_item: any) => {
              executions.push(
                ManpowerSchedule.findOne({
                  where: { msid: manpower_schedule_item.id },
                })
                  .then((manpower_schedule: any) => {
                    manpower_schedule.note = manpower_schedule_item.note;
                    // manpower_schedule.schedule_date =
                    //   manpower_schedule_item.schedule_date;
                    manpower_schedule.started_time = new Date(
                      manpower_schedule_item.started_time
                    );
                    manpower_schedule.finished_time = new Date(
                      manpower_schedule_item.finished_time
                    );
                    manpower_schedule.actual_date =
                      manpower_schedule_item.actual_date;
                    manpower_schedule.update_member = user?.uid;
                    manpower_schedule.save();
                  })
                  .catch((err) => {
                    return res.json({
                      code: 500,
                      status: "error",
                      data: null,
                      message: `更新派工資料時發生錯誤 ${err}`,
                    });
                  })
              );
            }
          );
        }

        if (power_stop) {
          JSON.parse(power_stop).forEach((power_stop_item: any) => {
            executions.push(
              PowerStop.findOne({
                where: { psid: power_stop_item.id },
              })
                .then((power_stop: any) => {
                  power_stop.area = power_stop_item.area;
                  power_stop.started_date = power_stop_item.started_date;
                  power_stop.finished_date = power_stop_item.finished_date;
                  power_stop.other_description =
                    power_stop_item.other_description;
                  power_stop.stop_shift = power_stop_item.stop_shift;
                  power_stop.request_date = power_stop_item.request_date;
                  power_stop.receive_date = power_stop_item.receive_date;
                  power_stop.engineer = power_stop_item.engineer;
                  power_stop.customer = power_stop_item.customer;
                  power_stop.tai_power_area = power_stop_item.tai_power_area;
                  power_stop.tai_power_notify_date =
                    power_stop_item.tai_power_notify_date;
                  power_stop.is_holiday = power_stop_item.is_holiday;
                  power_stop.update_member = user?.uid;
                  power_stop.save();
                })
                .catch((err) => {
                  return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `更新派工資料時發生錯誤 ${err}`,
                  });
                })
            );
          });
        }

        Promise.all(executions)
          .then(() => {
            return res.json({
              code: 200,
              status: "success",
              data: null,
              message: `更新派工資料成功。`,
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `更新派工資料時發生錯誤 ${err}`,
            });
          });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `更新派工資料時發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新派工資料時發生錯誤 ${err}`,
    });
  }
};

export const create_assignment = (
  req: RequestWithUser,
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
      finished_date,
    } = req.body;
    const { user } = req;

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
      finished_date,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立派工資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立派工資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立派工資料發生錯誤 ${err}`,
    });
  }
};

export const create_manpower_schedule = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      aid,
      note,
      // schedule_date,
      started_time,
      finished_time,
      actual_date,
    } = req.body;
    const { user } = req;
    ManpowerSchedule.create({
      aid,
      note,
      // schedule_date,
      started_time,
      finished_time,
      actual_date,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立施工時間及人力安排成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立施工時間及人力安排發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立施工時間及人力安排發生錯誤 ${err}`,
    });
  }
};

export const create_power_stop = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      aid,
      area,
      other_description,
      stop_shift,
      request_date,
      receive_date,
      engineer,
      customer,
      tai_power_area,
      tai_power_notify_date,
      is_holiday,
    } = req.body;
    const { user } = req;

    PowerStop.create({
      aid,
      area,
      other_description,
      stop_shift,
      request_date,
      receive_date,
      engineer,
      customer,
      tai_power_area,
      tai_power_notify_date,
      is_holiday,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立停電狀況成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立停電狀況時發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立停電狀況時發生錯誤 ${err}`,
    });
  }
};

export const update_acceptance_check = (
  req: RequestWithUser,
  res: Response
) => {
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
      warranty_number,
      warranty_started_date,
      warranty_end_date,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
      // work_order_name,
      // work_order_type,
      // po,
      // acceptance_check_date,
      // tobill_date,
      // factory_date,
      // assignment_date,
      is_inspection_report_retrieved_date,
      is_inspection_report_retrieved,
      photo_download,
      photo_download_date,
    } = req.body;
    const { user } = req;

    AcceptanceCheck.findOne({
      where: { woid: woid },
    })
      .then((acceptance_check: any) => {
        acceptance_check.photo_download = photo_download;
        acceptance_check.photo_download_date = photo_download_date;
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
        acceptance_check.warranty_number = warranty_number;
        acceptance_check.warranty_started_date = warranty_started_date;
        acceptance_check.warranty_end_date = warranty_end_date;
        acceptance_check.tracking_date = tracking_date;
        acceptance_check.tracking_description = tracking_description;
        acceptance_check.tracking_is_finished = tracking_is_finished;
        acceptance_check.finished_date = finished_date;
        acceptance_check.wt_report_number = wt_report_number;
        acceptance_check.update_member = user?.uid;
        acceptance_check.is_inspection_report_retrieved_date =
          is_inspection_report_retrieved_date;
        acceptance_check.is_inspection_report_retrieved =
          is_inspection_report_retrieved;
        acceptance_check.save();
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `更新驗收資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `更新驗收資料時發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新驗收資料時發生錯誤 ${err}`,
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
              attributes: [
                "customer_number",
                "short_name",
                "acceptance_check_description",
              ],
            },
          ],
        },
      ],
    })
      .then((acceptance_check) => {
        let data: any = {};
        data.id = acceptance_check?.dataValues.acid;
        data.description =
          acceptance_check?.dataValues.work_order.dataValues.customer.dataValues.acceptance_check_description;
        data.is_photo_before = acceptance_check?.dataValues.is_photo_before;
        data.is_photo_during = acceptance_check?.dataValues.is_photo_during;
        data.is_photo_after = acceptance_check?.dataValues.is_photo_after;
        data.power_switch_date1 =
          acceptance_check?.dataValues.power_switch_date1;
        data.power_switch_date2 =
          acceptance_check?.dataValues.power_switch_date2;
        data.power_switch_date3 =
          acceptance_check?.dataValues.power_switch_date3;
        data.power_switch_date4 =
          acceptance_check?.dataValues.power_switch_date4;
        data.defect_agreement = acceptance_check?.dataValues.defect_agreement;
        data.report_type = acceptance_check?.dataValues.report_type;
        data.ew06_registration = acceptance_check?.dataValues.ew06_registration;
        data.fom17_registration_government_date =
          acceptance_check?.dataValues.fom17_registration_government_date;
        data.fom17_registration_ele_date =
          acceptance_check?.dataValues.fom17_registration_ele_date;
        data.is_warranty = acceptance_check?.dataValues.is_warranty;
        data.warranty_number = acceptance_check?.dataValues.warranty_number;
        data.warranty_started_date =
          acceptance_check?.dataValues.warranty_started_date;
        data.warranty_end_date = acceptance_check?.dataValues.warranty_end_date;
        data.tracking_date = acceptance_check?.dataValues.tracking_date;
        data.tracking_description =
          acceptance_check?.dataValues.tracking_description;
        data.tracking_is_finished =
          acceptance_check?.dataValues.tracking_is_finished;
        data.finished_date = acceptance_check?.dataValues.finished_date;
        data.is_inspection_report_retrieved =
          acceptance_check?.dataValues.is_inspection_report_retrieved;
        data.is_inspection_report_retrieved_date =
          acceptance_check?.dataValues.is_inspection_report_retrieved_date;
        data.photo_download = acceptance_check?.dataValues.photo_download;
        data.photo_download_date =
          acceptance_check?.dataValues.photo_download_date;
        // data.wt_report_number = acceptance_check?.dataValues.wt_report_number;
        // data.work_order_name =
        //   acceptance_check?.dataValues.work_order.dataValues.name;
        // data.work_order_type =
        //   acceptance_check?.dataValues.work_order.dataValues.type;
        // data.po = acceptance_check?.dataValues.work_order.dataValues.po;
        // data.acceptance_check_date =
        //   acceptance_check?.dataValues.work_order.dataValues.acceptance_check_date;
        // data.tobill_date =
        //   acceptance_check?.dataValues.work_order.dataValues.tobill_date;
        // data.factory_date =
        //   acceptance_check?.dataValues.work_order.dataValues.factory_date;
        // data.assignment_date =
        //   acceptance_check?.dataValues.work_order.dataValues.assignment_date;
        // data.customer_number =
        //   acceptance_check?.dataValues.work_order.dataValues.customer.dataValues.customer_number;
        // data.customer_name =
        //   acceptance_check?.dataValues.work_order.dataValues.customer.dataValues.short_name;

        return res.json({
          code: 200,
          status: "success",
          data: data,
          message: `取得驗收資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `取得驗收資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得驗收資料發生錯誤 ${err}`,
    });
  }
};

export const create_acceptance_check = (
  req: RequestWithUser,
  res: Response
) => {
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
      warranty_number,
      warranty_started_date,
      warranty_end_date,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
      photo_download,
      photo_download_date,
    } = req.body;
    const { user } = req;

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
      warranty_number,
      warranty_started_date,
      warranty_end_date,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      wt_report_number,
      photo_download,
      photo_download_date,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立驗收資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立驗收資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立驗收資料發生錯誤 ${err}`,
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
              attributes: [
                "customer_number",
                "short_name",
                "factory_description",
              ],
            },
          ],
        },
        {
          model: FactoryOtherForm,
        },
      ],
    })
      .then((factory) => {
        let data: any = {};
        data.id = factory?.dataValues.fid;
        data.description =
          factory?.dataValues.work_order.dataValues.customer.dataValues.factory_description;
        data.tracking_date = factory?.dataValues.tracking_date;
        data.tracking_description = factory?.dataValues.tracking_description;
        data.tracking_is_finished = factory?.dataValues.tracking_is_finished;
        data.finished_date = factory?.dataValues.finished_date;
        data.is_class = factory?.dataValues.is_class;
        data.is_bunny_shoe = factory?.dataValues.is_bunny_shoe;
        data.is_bunny_suit = factory?.dataValues.is_bunny_suit;
        data.is_group_insurance = factory?.dataValues.is_group_insurance;
        data.is_label_insurance = factory?.dataValues.is_label_insurance;
        data.other_form = factory?.dataValues.other_form;
        // data.wt_report_number = factory?.dataValues.wt_report_number;
        // data.work_order_name = factory?.dataValues.work_order.dataValues.name;
        // data.work_order_type = factory?.dataValues.work_order.dataValues.type;
        // data.po = factory?.dataValues.work_order.dataValues.po;
        // data.acceptance_check_date =
        //   factory?.dataValues.work_order.dataValues.acceptance_check_date;
        // data.tobill_date = factory?.dataValues.work_order.dataValues.tobill_date;
        // data.factory_date =
        //   factory?.dataValues.work_order.dataValues.factory_date;
        // data.assignment_date =
        //   factory?.dataValues.work_order.dataValues.assignment_date;
        // data.customer_number =
        //   factory?.dataValues.work_order.dataValues.customer.dataValues.customer_number;
        // data.customer_name =
        //   factory?.dataValues.work_order.dataValues.customer.dataValues.short_name;
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
              update_date: factory_other_form.dataValues.updatedAt,
            };
          }
        );

        return res.json({
          code: 200,
          status: "success",
          data: data,
          message: `取得入廠驗收資料成功。 `,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `取得入廠驗收資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得入廠驗收資料發生錯誤 ${err}`,
    });
  }
};

export const update_factory = (req: RequestWithUser, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      is_class,
      is_bunny_shoe,
      is_bunny_suit,
      is_group_insurance,
      is_label_insurance,

      // wt_report_number,
      // work_order_name,
      // work_order_type,
      // po,
      // acceptance_check_date,
      // tobill_date,
      // factory_date,
      // assignment_date,

      factory_other_form,
    } = req.body;
    const { user } = req;

    Factorys.findOne({
      where: { woid: woid },
    })
      .then((factory: any) => {
        factory.description = description;
        factory.tracking_date = tracking_date;
        factory.tracking_description = tracking_description;
        factory.tracking_is_finished = tracking_is_finished;
        factory.finished_date = finished_date;
        factory.is_class = is_class;
        factory.is_bunny_shoe = is_bunny_shoe;
        factory.is_bunny_suit = is_bunny_suit;
        factory.is_group_insurance = is_group_insurance;
        factory.is_label_insurance = is_label_insurance;
        factory.update_member = user?.uid;
        factory.save();
        let executions: any = [];

        if (factory_other_form) {
          JSON.parse(factory_other_form).forEach(
            (factory_other_form_item: any) => {
              executions.push(
                FactoryOtherForm.findOne({
                  where: { foid: factory_other_form_item.id },
                })
                  .then((factory_other_form: any) => {
                    factory_other_form.is_class =
                      factory_other_form_item.is_class;
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
                    factory_other_form.update_member = user?.uid;

                    factory_other_form.save();
                  })
                  .catch((err) => {
                    return res.json({
                      code: 500,
                      status: "error",
                      data: null,
                      message: `更新入廠驗收資料發生錯誤 ${err}`,
                    });
                  })
              );
            }
          );
        }

        Promise.all(executions)
          .then(() => {
            return res.json({
              code: 200,
              status: "success",
              data: null,
              message: `更新入廠驗收資料成功。`,
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `更新入廠驗收資料發生錯誤 ${err}`,
            });
          });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `更新入廠驗收資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新入廠驗收資料發生錯誤 ${err}`,
    });
  }
};

export const create_factory = (req: RequestWithUser, res: Response) => {
  try {
    const {
      woid,
      description,
      is_class,
      is_bunny_shoe,
      is_bunny_suit,
      is_group_insurance,
      is_label_insurance,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
    } = req.body;
    const { user } = req;

    Factorys.create({
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      is_class,
      is_bunny_shoe,
      is_bunny_suit,
      is_group_insurance,
      is_label_insurance,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立入廠驗收資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立入廠驗收資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立入廠驗收資料發生錯誤 ${err}`,
    });
  }
};

export const create_factory_other_form = (
  req: RequestWithUser,
  res: Response
) => {
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
    const { user } = req;

    FactoryOtherForm.create({
      fid,
      is_class,
      is_bunny_shoe,
      is_bunny_suit,
      is_group_insurance,
      is_label_insurance,
      other_form,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立入廠驗收資料其他表格成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立入廠驗收資料其他表格發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立入廠驗收資料其他表格發生錯誤 ${err}`,
    });
  }
};

export const update_tobill = (req: RequestWithUser, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      // wt_report_number,
      // work_order_name,
      // work_order_type,
      // po,
      // acceptance_check_date,
      // tobill_date,
      // factory_date,
      // assignment_date,
      tobill_invoice,
    } = req.body;
    const { user } = req;

    ToBill.findOne({
      where: { woid: woid },
    })
      .then((tobill: any) => {
        tobill.description = description;
        tobill.tracking_date = tracking_date;
        tobill.tracking_description = tracking_description;
        tobill.tracking_is_finished = tracking_is_finished;
        tobill.finished_date = finished_date;
        tobill.update_member = user?.uid;
        tobill.save();

        let executions: any = [];
        if (tobill_invoice) {
          JSON.parse(tobill_invoice).forEach((tobill_invoice_item: any) => {
            executions.push(
              ToBillInvoice.findOne({
                where: { tbiid: tobill_invoice_item.id },
              })
                .then((tobill_invoice: any) => {
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
                  tobill_invoice.numbers_envelope =
                    tobill_invoice_item.numbers_envelope;
                  tobill_invoice.update_member = user?.uid;
                  tobill_invoice.save();
                })
                .catch((err) => {
                  return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `更新請款資料發生錯誤 ${err}`,
                  });
                })
            );
          });
        }
        Promise.all(executions)
          .then(() => {
            return res.json({
              code: 200,
              status: "success",
              data: null,
              message: `更新請款資料成功。`,
            });
          })
          .catch((err) => {
            return res.json({
              code: 500,
              status: "error",
              data: null,
              message: `更新請款資料發生錯誤 ${err}`,
            });
          });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `更新請款資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `更新請款資料發生錯誤 ${err}`,
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
              attributes: [
                "customer_number",
                "short_name",
                "tobill_description",
              ],
            },
          ],
        },
        {
          model: ToBillInvoice,
        },
      ],
    })
      .then((tobill) => {
        let data: any = {};
        data.id = tobill?.dataValues.tbid;
        data.description =
          tobill?.dataValues.work_order.dataValues.customer.dataValues.tobill_description;
        data.tracking_date = tobill?.dataValues.tracking_date;
        data.tracking_description = tobill?.dataValues.tracking_description;
        data.tracking_is_finished = tobill?.dataValues.tracking_is_finished;
        data.finished_date = tobill?.dataValues.finished_date;

        // data.wt_report_number = tobill?.dataValues.wt_report_number;
        // data.work_order_name = tobill?.dataValues.work_order.dataValues.name;
        // data.work_order_type = tobill?.dataValues.work_order.dataValues.type;
        // data.po = tobill?.dataValues.work_order.dataValues.po;
        // data.acceptance_check_date =
        //   tobill?.dataValues.work_order.dataValues.acceptance_check_date;
        // data.tobill_date = tobill?.dataValues.work_order.dataValues.tobill_date;
        // data.factory_date = tobill?.dataValues.work_order.dataValues.factory_date;
        // data.assignment_date =
        //   tobill?.dataValues.work_order.dataValues.assignment_date;
        // data.customer_number =
        //   tobill?.dataValues.work_order.dataValues.customer.dataValues.customer_number;
        // data.customer_name =
        //   tobill?.dataValues.work_order.dataValues.customer.dataValues.short_name;
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
              numbers_envelope: tobill_invoice.dataValues.numbers_envelope,
              invoice_number: tobill_invoice.dataValues.invoice_number,
            };
          }
        );

        return res.json({
          code: 200,
          status: "success",
          data: data,
          message: `取得請款資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `取得請款資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `取得請款資料發生錯誤 ${err}`,
    });
  }
};

export const create_tobill = (req: RequestWithUser, res: Response) => {
  try {
    const {
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
    } = req.body;
    const { user } = req;

    ToBill.create({
      woid,
      description,
      tracking_date,
      tracking_description,
      tracking_is_finished,
      finished_date,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立請款資料成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立請款資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立請款資料發生錯誤 ${err}`,
    });
  }
};

export const create_tobill_invoice = (req: RequestWithUser, res: Response) => {
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
      numbers_envelope,
      invoice_number,
    } = req.body;
    const { user } = req;

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
      numbers_envelope,
      invoice_number,
      update_member: user?.uid,
      create_member: user?.uid,
      is_del: false,
    })
      .then(() => {
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `建立發票記錄成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `建立發票記錄資料發生錯誤 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `建立發票記錄資料發生錯誤 ${err}`,
    });
  }
};

export const delete__work_order = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { woid } = req.params;
  const { user } = req;

  try {
    WorkOrder.findOne({ where: { woid: woid } })
      .then((work_order: any) => {
        work_order.is_del = true;
        work_order.update_member = user?.uid;
        work_order.save();
        return res.json({
          code: 200,
          status: "success",
          data: null,
          message: `刪除工單成功。`,
        });
      })
      .catch((err) => {
        return res.json({
          code: 500,
          status: "error",
          data: null,
          message: `刪除工單時發生問題。 ${err}`,
        });
      });
  } catch (err) {
    return res.json({
      code: 500,
      status: "error",
      data: null,
      message: `刪除工單時發生問題。 ${err}`,
    });
  }
};

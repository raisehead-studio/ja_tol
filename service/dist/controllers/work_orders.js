"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete__work_order = exports.create_tobill_invoice = exports.create_tobill = exports.get_tobill_detail = exports.update_tobill = exports.create_factory_other_form = exports.create_factory = exports.update_factory = exports.get_factory_detail = exports.create_acceptance_check = exports.get_acceptance_check_detail = exports.update_acceptance_check = exports.create_power_stop = exports.create_manpower_schedule = exports.create_assignment = exports.update_assignment = exports.get_assignment_detail = exports.update_work_order_detail = exports.get_work_order_detail = exports.get_work_orders_list = exports.create_work_order = void 0;
const work_orders_1 = __importDefault(require("../models/work_orders"));
const customer_1 = __importDefault(require("../models/customer"));
const assignments_1 = __importDefault(require("../models/assignments"));
const power_stop_1 = __importDefault(require("../models/power_stop"));
const manpower_schedule_1 = __importDefault(require("../models/manpower_schedule"));
const acceptance_check_1 = __importDefault(require("../models/acceptance_check"));
const factorys_1 = __importDefault(require("../models/factorys"));
const factory_other_forms_1 = __importDefault(require("../models/factory_other_forms"));
const tobill_1 = __importDefault(require("../models/tobill"));
const tobill_invoce_1 = __importDefault(require("../models/tobill_invoce"));
const ele_place_1 = __importDefault(require("../models/ele_place"));
const user_1 = __importDefault(require("../models/user"));
const create_work_order = (req, res, next) => {
    try {
        const { cid, name, invoice_number, order_number, type, amount, inquiry_member, responsible_member, po, acceptance_check_date, tobill_date, factory_date, assignment_date, price, } = req.body;
        const { user } = req;
        work_orders_1.default.create({
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
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
            is_del: false,
        })
            .then(async (result) => {
            let executions = [];
            let woid = result.dataValues.woid;
            let description = "";
            let tracking_date = new Date();
            let tracking_description = "";
            let tracking_is_finished = false;
            let finished_date = new Date();
            let is_photo_before = false;
            let is_photo_during = false;
            let is_photo_after = false;
            let power_switch_date1 = new Date();
            let power_switch_date2 = new Date();
            let power_switch_date3 = new Date();
            let power_switch_date4 = new Date();
            let defect_agreement = false;
            let report_type = "";
            let ew06_registration = false;
            let fom17_registration_government_date = new Date();
            let fom17_registration_ele_date = new Date();
            let is_warranty = false;
            let wt_report_number = "";
            let manufacturing_address = "";
            let manufacturing_status = "";
            let manufacturing_date = new Date();
            let power_stop_contact = "";
            let power_stop_phone1 = "";
            let power_stop_phone2 = "";
            let power_stop_date = new Date();
            let external_contact_is_holiday = false;
            let external_contact_is_power_stop = false;
            let external_contact_request_date = new Date();
            let external_contact_receive_date = new Date();
            let tracking_finished_date = new Date();
            executions.push(factorys_1.default.create({
                woid,
                description,
                tracking_date,
                tracking_description,
                tracking_is_finished,
                update_member: user === null || user === void 0 ? void 0 : user.uid,
                create_membe: user === null || user === void 0 ? void 0 : user.uid,
                is_del: false,
            })
                .then(() => { })
                .catch((err) => {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立工單資料時發生問題。 ${err}`,
                });
                next();
            }));
            executions.push(acceptance_check_1.default.create({
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
                wt_report_number,
                update_member: user === null || user === void 0 ? void 0 : user.uid,
                create_member: user === null || user === void 0 ? void 0 : user.uid,
                is_del: false,
            })
                .then(() => { })
                .catch((err) => {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立工單資料時發生問題。 ${err}`,
                });
                next();
            }));
            executions.push(assignments_1.default.create({
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
                update_member: user === null || user === void 0 ? void 0 : user.uid,
                create_member: user === null || user === void 0 ? void 0 : user.uid,
                is_del: false,
            })
                .then(() => { })
                .catch((err) => {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立工單資料時發生問題。 ${err}`,
                });
                next();
            }));
            executions.push(tobill_1.default.create({
                woid,
                description,
                tracking_date,
                tracking_description,
                tracking_is_finished,
                update_member: user === null || user === void 0 ? void 0 : user.uid,
                create_member: user === null || user === void 0 ? void 0 : user.uid,
                is_del: false,
            })
                .then(() => { })
                .catch((err) => {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立工單資料時發生問題。 ${err}`,
                });
                next();
            }));
            Promise.all(executions)
                .then(() => {
                return res.json({
                    code: 200,
                    status: "success",
                    data: null,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立工單資料時發生問題。 ${err}`,
        });
        next(err);
    }
};
exports.create_work_order = create_work_order;
const get_work_orders_list = async (req, res, next) => {
    const users = await user_1.default.findAll({ where: { is_del: false } });
    try {
        work_orders_1.default.findAll({
            where: { is_del: false },
            include: [
                {
                    model: customer_1.default,
                    attributes: ["customer_number", "short_name"],
                },
                {
                    model: acceptance_check_1.default,
                },
                {
                    model: assignments_1.default,
                    attributes: [
                        "manufacturing_date",
                        "aid",
                        "is_assign_manpower",
                        "tracking_date",
                        "tracking_is_finished",
                        "tracking_description",
                    ],
                    include: [
                        {
                            model: manpower_schedule_1.default,
                            attributes: ["started_time"],
                            order: [["started_time", "ASC"]],
                            limit: 1,
                        },
                    ],
                },
                {
                    model: tobill_1.default,
                    attributes: [
                        "tracking_date",
                        "tracking_is_finished",
                        "tracking_description",
                    ],
                },
                {
                    model: factorys_1.default,
                    attributes: [
                        "tracking_date",
                        "tracking_is_finished",
                        "tracking_description",
                    ],
                },
            ],
        })
            .then((work_orders) => {
            return res.json({
                code: 200,
                status: "success",
                data: work_orders.map((worker_order) => {
                    let item_data;
                    if (!worker_order.dataValues.assignment.dataValues
                        .tracking_is_finished) {
                        item_data = "112WT0268派工";
                    }
                    else {
                        if (!worker_order.dataValues.factory.dataValues.tracking_is_finished) {
                            item_data = "112WT0187入廠";
                        }
                        else {
                            if (!worker_order.dataValues.acceptance_check.dataValues
                                .tracking_is_finished) {
                                item_data = "112WT0268驗收";
                            }
                            else {
                                if (!worker_order.dataValues.tobill.dataValues
                                    .tracking_is_finished) {
                                    item_data = "112WT0551請款";
                                }
                            }
                        }
                    }
                    return {
                        id: worker_order.dataValues.woid,
                        work_order_name: worker_order.dataValues.name,
                        invoice_number: worker_order.dataValues.invoice_number,
                        order_number: worker_order.dataValues.order_number,
                        update_date: worker_order.dataValues.updatedAt,
                        customer_number: worker_order.dataValues.customer.dataValues.customer_number,
                        customer_name: worker_order.dataValues.customer.dataValues.short_name,
                        notify_date: new Date(),
                        update_member: users.filter((user) => worker_order.dataValues.update_member === user.uid)[0].name,
                        manufacturing_date: worker_order.dataValues.assignment.manufacturing_date,
                        started_time: worker_order.dataValues.assignment.manpower_schedules.length > 0
                            ? worker_order.dataValues.assignment.manpower_schedules[0]
                                .dataValues.started_time
                            : null,
                        status: [""],
                        is_inspection_report_retrieved_date: worker_order.dataValues.acceptance_check.dataValues
                            .is_inspection_report_retrieved_date,
                        item_data: item_data || null,
                        is_assign_manpower: worker_order.dataValues.assignment.dataValues
                            .is_assign_manpower,
                    };
                }),
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得工單資料列表時發生問題。 ${err}`,
        });
    }
};
exports.get_work_orders_list = get_work_orders_list;
const get_work_order_detail = (req, res, next) => {
    const { woid } = req.params;
    try {
        work_orders_1.default.findOne({
            where: { woid: woid },
            include: [
                {
                    model: assignments_1.default,
                },
                {
                    model: acceptance_check_1.default,
                },
                {
                    model: tobill_1.default,
                },
                {
                    model: factorys_1.default,
                },
            ],
        })
            .then(async (work_order) => {
            var _a, _b, _c, _d;
            const ele = await ele_place_1.default.findOne({
                where: { cid: work_order.dataValues.cid },
            });
            console.log(ele);
            console.log(work_order);
            return res.json({
                code: 200,
                status: "success",
                data: {
                    assign_finished_date: (_a = work_order === null || work_order === void 0 ? void 0 : work_order.dataValues.assignment) === null || _a === void 0 ? void 0 : _a.dataValues.finished_date,
                    acceptance_check_finished_date: (_b = work_order === null || work_order === void 0 ? void 0 : work_order.dataValues.acceptance_check) === null || _b === void 0 ? void 0 : _b.dataValues.finished_date,
                    to_bill_finished_date: (_c = work_order === null || work_order === void 0 ? void 0 : work_order.dataValues.to_bill) === null || _c === void 0 ? void 0 : _c.dataValues.finished_date,
                    factory_finished_date: (_d = work_order === null || work_order === void 0 ? void 0 : work_order.dataValues.factory) === null || _d === void 0 ? void 0 : _d.dataValues.finished_date,
                    ele_name: ele === null || ele === void 0 ? void 0 : ele.dataValues.name,
                    ele_address: ele === null || ele === void 0 ? void 0 : ele.dataValues.address,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得工單資料時發生問題。 ${err}`,
        });
    }
};
exports.get_work_order_detail = get_work_order_detail;
const update_work_order_detail = (req, res, next) => {
    try {
        const { woid, 
        // name,
        // invoice_number,
        // order_number,
        type, 
        // amount,
        // inquiry_member,
        // responsible_member,
        po, acceptance_check_date, tobill_date, factory_date, assignment_date, price, } = req.body;
        const { user } = req;
        work_orders_1.default.findOne({ where: { woid: woid } })
            .then((work) => {
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
                work.update_member = user === null || user === void 0 ? void 0 : user.uid;
                work.price = price;
                work.save();
                return res.json({
                    code: 200,
                    status: "success",
                    data: null,
                    message: `更新工單資料成功。`,
                });
            }
            catch (err) {
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新工單資料時發生問題。 ${err}`,
        });
    }
};
exports.update_work_order_detail = update_work_order_detail;
const get_assignment_detail = (req, res) => {
    const { woid } = req.params;
    try {
        assignments_1.default.findOne({
            where: { woid: woid },
            include: [
                {
                    model: manpower_schedule_1.default,
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
                    model: power_stop_1.default,
                    attributes: ["psid", "area", "started_date", "finished_date"],
                },
            ],
        })
            .then((assignment) => {
            work_orders_1.default.findOne({
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
                        model: customer_1.default,
                        attributes: ["customer_number", "short_name"],
                    },
                ],
            })
                .then((work_order) => {
                let data = {};
                data.id = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.aid;
                data.manufacturing_address =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.manufacturing_address;
                data.manufacturing_status =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.manufacturing_status;
                data.manufacturing_date = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.manufacturing_date;
                data.power_stop_contact = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.power_stop_contact;
                data.power_stop_phone1 = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.power_stop_phone1;
                data.power_stop_phone2 = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.power_stop_phone2;
                data.power_stop_date = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.power_stop_date;
                data.external_contact_is_holiday =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.external_contact_is_holiday;
                data.external_contact_is_power_stop =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.external_contact_is_power_stop;
                data.external_contact_request_date =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.external_contact_request_date;
                data.external_contact_receive_date =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.external_contact_receive_date;
                data.tracking_date = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.tracking_date;
                data.tracking_description =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.tracking_description;
                data.tracking_is_finished =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.tracking_is_finished;
                data.tracking_finished_date =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.tracking_finished_date;
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
                data.is_assign_manpower = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.is_assign_manpower;
                data.manpower_schedule =
                    assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.manpower_schedules.map((manpower_schedule) => {
                        return {
                            id: manpower_schedule.dataValues.msid,
                            note: manpower_schedule.dataValues.note,
                            schedule_date: manpower_schedule.dataValues.schedule_date,
                            started_time: manpower_schedule.dataValues.started_time,
                            finished_time: manpower_schedule.dataValues.finished_time,
                            actual_date: manpower_schedule.dataValues.actual_date,
                        };
                    });
                data.power_stop = assignment === null || assignment === void 0 ? void 0 : assignment.dataValues.power_stops.map((power_stop) => {
                    return {
                        id: power_stop.dataValues.psid,
                        area: power_stop.dataValues.area,
                        started_date: power_stop.dataValues.started_date,
                        finished_date: power_stop.dataValues.finished_date,
                    };
                });
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得派工資料時發生問題 ${err}`,
        });
    }
};
exports.get_assignment_detail = get_assignment_detail;
const update_assignment = (req, res, next) => {
    try {
        const { woid, manufacturing_address, manufacturing_status, manufacturing_date, 
        // power_stop_contact,
        // power_stop_phone1,
        // power_stop_phone2,
        // power_stop_date,
        external_contact_is_holiday, external_contact_is_power_stop, external_contact_request_date, external_contact_receive_date, tracking_date, tracking_description, tracking_is_finished, tracking_finished_date, 
        // work_order_name,
        // work_order_type,
        // po,
        // acceptance_check_date,
        // tobill_date,
        // factory_date,
        // assignment_date,
        manpower_schedule, power_stop, } = req.body;
        const { user } = req;
        assignments_1.default.findOne({
            where: { woid: woid },
        })
            .then((assignment) => {
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
            assignment.tracking_finished_date = tracking_finished_date;
            assignment.update_member = user === null || user === void 0 ? void 0 : user.uid;
            assignment.save();
            let executions = [];
            JSON.parse(manpower_schedule).forEach((manpower_schedule_item) => {
                executions.push(manpower_schedule_1.default.findOne({
                    where: { msid: manpower_schedule_item.id },
                })
                    .then((manpower_schedule) => {
                    manpower_schedule.note = manpower_schedule_item.note;
                    // manpower_schedule.schedule_date =
                    //   manpower_schedule_item.schedule_date;
                    manpower_schedule.started_time = new Date(manpower_schedule_item.started_time);
                    manpower_schedule.finished_time = new Date(manpower_schedule_item.finished_time);
                    manpower_schedule.actual_date =
                        manpower_schedule_item.actual_date;
                    manpower_schedule.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    manpower_schedule.save();
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `更新派工資料時發生錯誤 ${err}`,
                    });
                }));
            });
            JSON.parse(power_stop).forEach((power_stop_item) => {
                executions.push(power_stop_1.default.findOne({
                    where: { psid: power_stop_item.id },
                })
                    .then((power_stop) => {
                    power_stop.area = power_stop_item.area;
                    power_stop.started_date = power_stop_item.started_date;
                    power_stop.finished_date = power_stop_item.finished_date;
                    power_stop.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    power_stop.save();
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `更新派工資料時發生錯誤 ${err}`,
                    });
                }));
            });
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新派工資料時發生錯誤 ${err}`,
        });
    }
};
exports.update_assignment = update_assignment;
const create_assignment = (req, res, next) => {
    try {
        const { woid, manufacturing_address, manufacturing_status, manufacturing_date, power_stop_contact, power_stop_phone1, power_stop_phone2, power_stop_date, external_contact_is_holiday, external_contact_is_power_stop, external_contact_request_date, external_contact_receive_date, tracking_date, tracking_description, tracking_is_finished, tracking_finished_date, } = req.body;
        const { user } = req;
        assignments_1.default.create({
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
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立派工資料發生錯誤 ${err}`,
        });
    }
};
exports.create_assignment = create_assignment;
const create_manpower_schedule = (req, res, next) => {
    try {
        const { aid, note, 
        // schedule_date,
        started_time, finished_time, actual_date, } = req.body;
        const { user } = req;
        manpower_schedule_1.default.create({
            aid,
            note,
            // schedule_date,
            started_time,
            finished_time,
            actual_date,
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立施工時間及人力安排發生錯誤 ${err}`,
        });
    }
};
exports.create_manpower_schedule = create_manpower_schedule;
const create_power_stop = (req, res, next) => {
    try {
        const { aid, area, started_date, finished_date } = req.body;
        const { user } = req;
        power_stop_1.default.create({
            aid,
            area,
            started_date,
            finished_date,
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立停電狀況時發生錯誤 ${err}`,
        });
    }
};
exports.create_power_stop = create_power_stop;
const update_acceptance_check = (req, res) => {
    try {
        const { woid, description, is_photo_before, is_photo_during, is_photo_after, power_switch_date1, power_switch_date2, power_switch_date3, power_switch_date4, defect_agreement, report_type, ew06_registration, fom17_registration_government_date, fom17_registration_ele_date, is_warranty, tracking_date, tracking_description, tracking_is_finished, finished_date, wt_report_number, 
        // work_order_name,
        // work_order_type,
        // po,
        // acceptance_check_date,
        // tobill_date,
        // factory_date,
        // assignment_date,
        is_inspection_report_retrieved_date, is_inspection_report_retrieved, } = req.body;
        const { user } = req;
        acceptance_check_1.default.findOne({
            where: { woid: woid },
        })
            .then((acceptance_check) => {
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
            acceptance_check.update_member = user === null || user === void 0 ? void 0 : user.uid;
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新驗收資料時發生錯誤 ${err}`,
        });
    }
};
exports.update_acceptance_check = update_acceptance_check;
const get_acceptance_check_detail = (req, res) => {
    try {
        acceptance_check_1.default.findOne({
            where: { woid: req.params.woid },
            include: [
                {
                    model: work_orders_1.default,
                    include: [
                        {
                            model: customer_1.default,
                            attributes: ["customer_number", "short_name"],
                        },
                    ],
                },
            ],
        })
            .then((acceptance_check) => {
            let data = {};
            data.id = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.acid;
            data.description = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.description;
            data.is_photo_before = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.is_photo_before;
            data.is_photo_during = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.is_photo_during;
            data.is_photo_after = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.is_photo_after;
            data.power_switch_date1 =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.power_switch_date1;
            data.power_switch_date2 =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.power_switch_date2;
            data.power_switch_date3 =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.power_switch_date3;
            data.power_switch_date4 =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.power_switch_date4;
            data.defect_agreement = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.defect_agreement;
            data.report_type = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.report_type;
            data.ew06_registration = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.ew06_registration;
            data.fom17_registration_government_date =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.fom17_registration_government_date;
            data.fom17_registration_ele_date =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.fom17_registration_ele_date;
            data.is_warranty = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.is_warranty;
            data.tracking_date = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.tracking_date;
            data.tracking_description =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.tracking_description;
            data.tracking_is_finished =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.tracking_is_finished;
            data.finished_date = acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.finished_date;
            data.is_inspection_report_retrieved =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.is_inspection_report_retrieved;
            data.is_inspection_report_retrieved_date =
                acceptance_check === null || acceptance_check === void 0 ? void 0 : acceptance_check.dataValues.is_inspection_report_retrieved_date;
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得驗收資料發生錯誤 ${err}`,
        });
    }
};
exports.get_acceptance_check_detail = get_acceptance_check_detail;
const create_acceptance_check = (req, res) => {
    try {
        const { woid, description, is_photo_before, is_photo_during, is_photo_after, power_switch_date1, power_switch_date2, power_switch_date3, power_switch_date4, defect_agreement, report_type, ew06_registration, fom17_registration_government_date, fom17_registration_ele_date, is_warranty, tracking_date, tracking_description, tracking_is_finished, finished_date, wt_report_number, } = req.body;
        const { user } = req;
        acceptance_check_1.default.create({
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
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立驗收資料發生錯誤 ${err}`,
        });
    }
};
exports.create_acceptance_check = create_acceptance_check;
const get_factory_detail = (req, res) => {
    try {
        factorys_1.default.findOne({
            where: { woid: req.params.woid },
            include: [
                {
                    model: work_orders_1.default,
                    include: [
                        {
                            model: customer_1.default,
                            attributes: ["customer_number", "short_name"],
                        },
                    ],
                },
                {
                    model: factory_other_forms_1.default,
                },
            ],
        })
            .then((factory) => {
            let data = {};
            data.id = factory === null || factory === void 0 ? void 0 : factory.dataValues.fid;
            data.description = factory === null || factory === void 0 ? void 0 : factory.dataValues.description;
            data.tracking_date = factory === null || factory === void 0 ? void 0 : factory.dataValues.tracking_date;
            data.tracking_description = factory === null || factory === void 0 ? void 0 : factory.dataValues.tracking_description;
            data.tracking_is_finished = factory === null || factory === void 0 ? void 0 : factory.dataValues.tracking_is_finished;
            data.finished_date = factory === null || factory === void 0 ? void 0 : factory.dataValues.finished_date;
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
            data.factory_other_form = factory === null || factory === void 0 ? void 0 : factory.dataValues.factory_other_forms.map((factory_other_form) => {
                return {
                    id: factory_other_form.dataValues.foid,
                    is_class: factory_other_form.dataValues.is_class,
                    is_bunny_shoe: factory_other_form.dataValues.is_bunny_shoe,
                    is_bunny_suit: factory_other_form.dataValues.is_bunny_suit,
                    is_group_insurance: factory_other_form.dataValues.is_group_insurance,
                    is_label_insurance: factory_other_form.dataValues.is_label_insurance,
                    other_form: factory_other_form.dataValues.other_form,
                };
            });
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得入廠驗收資料發生錯誤 ${err}`,
        });
    }
};
exports.get_factory_detail = get_factory_detail;
const update_factory = (req, res) => {
    try {
        const { woid, description, tracking_date, tracking_description, tracking_is_finished, finished_date, 
        // wt_report_number,
        // work_order_name,
        // work_order_type,
        // po,
        // acceptance_check_date,
        // tobill_date,
        // factory_date,
        // assignment_date,
        factory_other_form, } = req.body;
        const { user } = req;
        factorys_1.default.findOne({
            where: { woid: woid },
        })
            .then((factory) => {
            factory.description = description;
            factory.tracking_date = tracking_date;
            factory.tracking_description = tracking_description;
            factory.tracking_is_finished = tracking_is_finished;
            factory.finished_date = finished_date;
            factory.update_member = user === null || user === void 0 ? void 0 : user.uid;
            factory.save();
            let executions = [];
            JSON.parse(factory_other_form).forEach((factory_other_form_item) => {
                executions.push(factory_other_forms_1.default.findOne({
                    where: { foid: factory_other_form_item.id },
                })
                    .then((factory_other_form) => {
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
                    factory_other_form.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    factory_other_form.save();
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `更新入廠驗收資料發生錯誤 ${err}`,
                    });
                }));
            });
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新入廠驗收資料發生錯誤 ${err}`,
        });
    }
};
exports.update_factory = update_factory;
const create_factory = (req, res) => {
    try {
        const { woid, description, tracking_date, tracking_description, tracking_is_finished, finished_date, } = req.body;
        const { user } = req;
        factorys_1.default.create({
            woid,
            description,
            tracking_date,
            tracking_description,
            tracking_is_finished,
            finished_date,
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立入廠驗收資料發生錯誤 ${err}`,
        });
    }
};
exports.create_factory = create_factory;
const create_factory_other_form = (req, res) => {
    try {
        const { fid, is_class, is_bunny_shoe, is_bunny_suit, is_group_insurance, is_label_insurance, other_form, } = req.body;
        const { user } = req;
        factory_other_forms_1.default.create({
            fid,
            is_class,
            is_bunny_shoe,
            is_bunny_suit,
            is_group_insurance,
            is_label_insurance,
            other_form,
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立入廠驗收資料其他表格發生錯誤 ${err}`,
        });
    }
};
exports.create_factory_other_form = create_factory_other_form;
const update_tobill = (req, res) => {
    try {
        const { woid, description, tracking_date, tracking_description, tracking_is_finished, finished_date, 
        // wt_report_number,
        // work_order_name,
        // work_order_type,
        // po,
        // acceptance_check_date,
        // tobill_date,
        // factory_date,
        // assignment_date,
        tobill_invoice, } = req.body;
        const { user } = req;
        tobill_1.default.findOne({
            where: { woid: woid },
        })
            .then((tobill) => {
            tobill.description = description;
            tobill.tracking_date = tracking_date;
            tobill.tracking_description = tracking_description;
            tobill.tracking_is_finished = tracking_is_finished;
            tobill.finished_date = finished_date;
            tobill.update_member = user === null || user === void 0 ? void 0 : user.uid;
            tobill.save();
            let executions = [];
            JSON.parse(tobill_invoice).forEach((tobill_invoice_item) => {
                executions.push(tobill_invoce_1.default.findOne({
                    where: { tbiid: tobill_invoice_item.id },
                })
                    .then((tobill_invoice) => {
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
                    tobill_invoice.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    tobill_invoice.save();
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `更新請款資料發生錯誤 ${err}`,
                    });
                }));
            });
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新請款資料發生錯誤 ${err}`,
        });
    }
};
exports.update_tobill = update_tobill;
const get_tobill_detail = (req, res) => {
    try {
        tobill_1.default.findOne({
            where: { woid: req.params.woid },
            include: [
                {
                    model: work_orders_1.default,
                    include: [
                        {
                            model: customer_1.default,
                            attributes: ["customer_number", "short_name"],
                        },
                    ],
                },
                {
                    model: tobill_invoce_1.default,
                },
            ],
        })
            .then((tobill) => {
            let data = {};
            data.id = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.tbid;
            data.description = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.description;
            data.tracking_date = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.tracking_date;
            data.tracking_description = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.tracking_description;
            data.tracking_is_finished = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.tracking_is_finished;
            data.finished_date = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.finished_date;
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
            data.tobill_invoice = tobill === null || tobill === void 0 ? void 0 : tobill.dataValues.tobill_invoces.map((tobill_invoice) => {
                return {
                    id: tobill_invoice.dataValues.tbiid,
                    percentage: tobill_invoice.dataValues.percentage,
                    date: tobill_invoice.dataValues.date,
                    amount: tobill_invoice.dataValues.amount,
                    sent_date: tobill_invoice.dataValues.sent_date,
                    note: tobill_invoice.dataValues.note,
                    numbers_invoices: tobill_invoice.dataValues.numbers_invoices,
                    numbers_reports: tobill_invoice.dataValues.numbers_reports,
                    numbers_general_forms: tobill_invoice.dataValues.numbers_general_forms,
                    numbers_inqualify_agreements: tobill_invoice.dataValues.numbers_inqualify_agreements,
                    numbers_envelope: tobill_invoice.dataValues.numbers_envelope,
                    invoice_number: tobill_invoice.dataValues.invoice_number,
                };
            });
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得請款資料發生錯誤 ${err}`,
        });
    }
};
exports.get_tobill_detail = get_tobill_detail;
const create_tobill = (req, res) => {
    try {
        const { woid, description, tracking_date, tracking_description, tracking_is_finished, finished_date, } = req.body;
        const { user } = req;
        tobill_1.default.create({
            woid,
            description,
            tracking_date,
            tracking_description,
            tracking_is_finished,
            finished_date,
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立請款資料發生錯誤 ${err}`,
        });
    }
};
exports.create_tobill = create_tobill;
const create_tobill_invoice = (req, res) => {
    try {
        const { tbid, percentage, date, amount, sent_date, note, numbers_invoices, numbers_reports, numbers_general_forms, numbers_inqualify_agreements, numbers_envelope, invoice_number, } = req.body;
        const { user } = req;
        tobill_invoce_1.default.create({
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
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立發票記錄資料發生錯誤 ${err}`,
        });
    }
};
exports.create_tobill_invoice = create_tobill_invoice;
const delete__work_order = (req, res, next) => {
    const { woid } = req.params;
    const { user } = req;
    try {
        work_orders_1.default.findOne({ where: { woid: woid } })
            .then((work_order) => {
            work_order.is_del = true;
            work_order.update_member = user === null || user === void 0 ? void 0 : user.uid;
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `刪除工單時發生問題。 ${err}`,
        });
    }
};
exports.delete__work_order = delete__work_order;

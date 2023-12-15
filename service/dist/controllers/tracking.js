"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_tracking = void 0;
const service_1 = __importDefault(require("../models/service"));
const customer_1 = __importDefault(require("../models/customer"));
const work_orders_1 = __importDefault(require("../models/work_orders"));
const tobill_1 = __importDefault(require("../models/tobill"));
const acceptance_check_1 = __importDefault(require("../models/acceptance_check"));
const factorys_1 = __importDefault(require("../models/factorys"));
const assignments_1 = __importDefault(require("../models/assignments"));
const user_1 = __importDefault(require("../models/user"));
const get_tracking = async (req, res, next) => {
    const users = await user_1.default.findAll({ where: { is_del: false } });
    service_1.default.findAll({
        where: { is_del: false },
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
                model: customer_1.default,
                attributes: ["customer_number", "short_name"],
            },
        ],
    })
        .then((service) => {
        let data = [];
        service.forEach((item) => {
            data.push({
                id: item.dataValues.csid,
                notify_date: new Date(item.dataValues.notify_date).getTime(),
                customer_number: item.dataValues.customer.dataValues.customer_number,
                short_name: item.dataValues.customer.dataValues.short_name,
                work_order_number: "客服紀錄",
                item: item.dataValues.type,
                description: item.dataValues.title,
                update_member: users.filter((user) => item.dataValues.update_member === user.uid)[0].name,
                update_date: new Date(item.dataValues.updatedAt).getTime(),
            });
        });
        work_orders_1.default.findAll({
            where: { is_del: false },
            include: [
                {
                    model: customer_1.default,
                    attributes: ["customer_number", "short_name"],
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
                    model: acceptance_check_1.default,
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
                {
                    model: assignments_1.default,
                    attributes: [
                        "tracking_date",
                        "tracking_is_finished",
                        "tracking_description",
                    ],
                },
            ],
        })
            .then((work_orders) => {
            work_orders.forEach((item) => {
                let item_data;
                let description;
                let date;
                if (!item.dataValues.assignment.dataValues.tracking_is_finished) {
                    item_data = "112WT0268派工";
                    description =
                        item.dataValues.assignment.dataValues.tracking_description;
                    date = item.dataValues.assignment.dataValues.tracking_date;
                }
                else {
                    if (!item.dataValues.factory.dataValues.tracking_is_finished) {
                        item_data = "112WT0187入廠";
                        description =
                            item.dataValues.factory.dataValues.tracking_description;
                        date = item.dataValues.factory.dataValues.tracking_date;
                    }
                    else {
                        if (!item.dataValues.acceptance_check.dataValues
                            .tracking_is_finished) {
                            item_data = "112WT0268驗收";
                            description =
                                item.dataValues.acceptance_check.dataValues
                                    .tracking_description;
                            date =
                                item.dataValues.acceptance_check.dataValues.tracking_date;
                        }
                        else {
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
                        customer_number: item.dataValues.customer.dataValues.customer_number,
                        short_name: item.dataValues.customer.dataValues.short_name,
                        work_order_number: item.dataValues.order_number,
                        item: item_data,
                        description: description,
                        update_member: users.filter((user) => item.dataValues.update_member === user.uid)[0].name,
                        update_date: new Date(item.dataValues.updatedAt).getTime(),
                    });
                }
            });
            return res.json({
                code: 200,
                status: "success",
                data: data,
                message: `取得追蹤列表成功。`,
            });
        })
            .catch((err) => {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `取得追蹤列表時發生問題。 ${err}`,
            });
        });
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得追蹤列表時發生問題。 ${err}`,
        });
        next();
    });
};
exports.get_tracking = get_tracking;

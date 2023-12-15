"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_service = exports.update_service = exports.create_service_content = exports.get_service_detail = exports.get_service_list = exports.create_service = void 0;
const service_1 = __importDefault(require("../models/service"));
const service_content_1 = __importDefault(require("../models/service_content"));
const customer_1 = __importDefault(require("../models/customer"));
const user_1 = __importDefault(require("../models/user"));
const create_service = (req, res, next) => {
    const { cid, title, status, type, notify_date, content } = req.body;
    const { user } = req;
    service_1.default.create({
        cid,
        title,
        status,
        type,
        notify_date,
        update_member: user === null || user === void 0 ? void 0 : user.uid,
        create_member: user === null || user === void 0 ? void 0 : user.uid,
        is_del: false,
    })
        .then((service) => {
        service_content_1.default.create({
            content,
            csid: service.dataValues.csid,
            update_member: user === null || user === void 0 ? void 0 : user.uid,
            create_member: user === null || user === void 0 ? void 0 : user.uid,
            create_date: new Date(),
            is_del: false,
        })
            .then(() => {
            return res.json({
                code: 200,
                status: "success",
                data: {
                    csid: service.dataValues.csid,
                },
                message: `建立客服紀錄成功。`,
            });
        })
            .catch((err) => {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `建立客服紀錄時發生問題。 ${err}`,
            });
        });
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立客服紀錄時發生問題。 ${err}`,
        });
    });
};
exports.create_service = create_service;
const get_service_list = (_, res) => {
    service_1.default.findAll({
        where: { is_del: false },
        attributes: [
            "csid",
            "title",
            "status",
            "type",
            "notify_date",
            "update_member",
            "create_member",
            "updatedAt",
            "createdAt",
        ],
        include: {
            model: customer_1.default,
            attributes: ["customer_number", "short_name"],
        },
    })
        .then(async (result) => {
        const users = await user_1.default.findAll({ where: { is_del: false } });
        return res.json({
            code: 200,
            status: "success",
            data: result.map((item) => {
                return {
                    id: item.dataValues.csid,
                    title: item.dataValues.title,
                    status: item.dataValues.status,
                    type: item.dataValues.type,
                    notify_date: new Date(item.dataValues.notify_date).getTime(),
                    update_member: users.filter((user) => item.dataValues.update_member === user.uid)[0].name,
                    create_member: users.filter((user) => item.dataValues.update_member === user.uid)[0].name,
                    update_date: new Date(item.dataValues.updatedAt).getTime(),
                    customer_number: item.dataValues.customer.dataValues.customer_number,
                    short_name: item.dataValues.customer.dataValues.short_name,
                    create_date: new Date(item.dataValues.createdAt).getTime(),
                };
            }),
            message: `取得客服資料列表成功。`,
        });
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `得客服資料列表時發生問題。 ${err}`,
        });
    });
};
exports.get_service_list = get_service_list;
const get_service_detail = (req, res, next) => {
    const csid = req.params.csid;
    service_1.default.findOne({
        where: { csid },
        attributes: [
            "title",
            "status",
            "type",
            "notify_date",
            "update_member",
            "create_member",
            "updatedAt",
            "createdAt",
            "create_date",
        ],
        include: [
            {
                model: service_content_1.default,
                attributes: ["cscid", "content", "createdAt"],
            },
            {
                model: customer_1.default,
                attributes: ["customer_number", "short_name"],
            },
        ],
    })
        .then(async (result) => {
        let data = {};
        const update_name = await user_1.default.findOne({
            where: { uid: result.dataValues.update_member },
        });
        const create_name = await user_1.default.findOne({
            where: { uid: result.dataValues.create_member },
        });
        data.short_name = result.dataValues.customer.short_name;
        data.customer_number = result.dataValues.customer.customer_number;
        data.title = result.dataValues.title;
        data.status = result.dataValues.status;
        data.type = result.dataValues.type;
        data.notify_date = new Date(result.dataValues.notify_date).getTime();
        data.update_member = update_name;
        data.create_member = create_name;
        data.create_date = new Date(result.dataValues.createdAt).getTime();
        data.customer_service_contents =
            result.dataValues.customer_service_contents.map((item) => {
                return {
                    id: item.dataValues.cscid,
                    content: item.dataValues.content,
                    create_date: new Date(item.dataValues.createdAt).getTime(),
                };
            });
        return res.json({
            code: 200,
            status: "success",
            data: data,
            message: `取得客服資料成功。`,
        });
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得客服資料時發生問題。 ${err}`,
        });
    });
};
exports.get_service_detail = get_service_detail;
const create_service_content = (req, res, next) => {
    const { csid, content } = req.body;
    const { user } = req;
    service_content_1.default.create({
        csid,
        content,
        update_member: user === null || user === void 0 ? void 0 : user.uid,
        create_member: user === null || user === void 0 ? void 0 : user.uid,
        is_del: false,
    })
        .then((result) => {
        return res.json({
            code: 200,
            status: "success",
            data: result,
            message: `建立客服紀錄內容成功。`,
        });
        next();
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立客服紀錄內容時發生問題。 ${err}`,
        });
    });
};
exports.create_service_content = create_service_content;
const update_service = (req, res) => {
    try {
        const { csid, title, status, type, notify_date, customer_service_contents, } = req.body;
        const { user } = req;
        service_1.default.findOne({
            where: { csid },
        })
            .then((service) => {
            if (service) {
                service.title = title;
                service.status = status;
                service.type = type;
                service.notify_date = notify_date;
                service.update_member = user === null || user === void 0 ? void 0 : user.uid;
                service.save();
                let update_customer_service_contents = JSON.parse(customer_service_contents);
                let execution = [];
                const handle_update_customer_service_content = async (cscid, content) => {
                    const service_content = await service_content_1.default.findOne({
                        where: { cscid: cscid },
                    });
                    service_content.content = content;
                    service_content.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    await service_content.save();
                };
                for (let i = 0; i < update_customer_service_contents.length; i++) {
                    execution.push(handle_update_customer_service_content(update_customer_service_contents[i].cscid, update_customer_service_contents[i].content));
                }
                Promise.all(execution)
                    .then(() => {
                    return res.json({
                        code: 200,
                        status: "success",
                        data: null,
                        message: `更新客服紀錄成功。`,
                    });
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `更新客服紀錄時發生問題。 ${err}`,
                    });
                });
            }
            else {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `更新客服紀錄時發生問題。 沒有此筆客服紀錄資料`,
                });
            }
        })
            .catch((err) => {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `更新客服紀錄時發生問題。 ${err}`,
            });
        });
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新客服紀錄時發生問題。 ${err}`,
        });
    }
};
exports.update_service = update_service;
const delete_service = (req, res) => {
    try {
        const { csid } = req.params;
        const { user } = req;
        service_1.default.findOne({ where: { csid: csid } })
            .then(async (service) => {
            service.is_del = true;
            service.update_member = user === null || user === void 0 ? void 0 : user.uid;
            await service.save();
            return res.json({
                code: 200,
                status: "success",
                data: null,
                message: `刪除客服紀錄成功。`,
            });
        })
            .catch((err) => {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `刪除客服紀錄時發生問題。 ${err}`,
            });
        });
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `刪除客服紀錄時發生問題。 ${err}`,
        });
    }
};
exports.delete_service = delete_service;

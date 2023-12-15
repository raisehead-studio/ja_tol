"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.update_user = exports.get_user = exports.get_users = exports.create_user = void 0;
const user_1 = __importDefault(require("../models/user"));
const permissions_1 = __importDefault(require("../models/permissions"));
const create_user = (req, res, next) => {
    const { account, name, password, role } = req.body;
    const { user } = req;
    let create_member = user === null || user === void 0 ? void 0 : user.uid;
    let update_member = user === null || user === void 0 ? void 0 : user.uid;
    user_1.default.findOne({ where: { account: account } })
        .then((user) => {
        if (!user) {
            user_1.default.create({
                account,
                password,
                name,
                role,
                update_member: update_member,
                create_member: create_member,
                is_del: false,
            })
                .then((result) => {
                if (role === "admin") {
                    permissions_1.default.create({
                        uid: result.dataValues.uid,
                        is_tracking_page: true,
                        is_tracking_page_insert: true,
                        is_tracking_page_update: true,
                        is_tracking_page_read: true,
                        is_tracking_page_delete: true,
                        is_customer_page: true,
                        is_customer_page_insert: true,
                        is_customer_page_update: true,
                        is_customer_page_read: true,
                        is_customer_page_delete: true,
                        is_service_page: true,
                        is_service_page_insert: true,
                        is_service_page_update: true,
                        is_service_page_read: true,
                        is_service_page_delete: true,
                        is_work_page: true,
                        is_work_page_insert: true,
                        is_work_page_update: true,
                        is_work_page_read: true,
                        is_work_page_delete: true,
                        is_admin_page: true,
                        is_admin_page_insert: true,
                        is_admin_page_update: true,
                        is_admin_page_read: true,
                        is_admin_page_delete: true,
                    })
                        .then(() => {
                        return res.json({
                            code: 200,
                            status: "success",
                            data: {
                                uid: result.dataValues.uid,
                            },
                            message: `建立人員成功。`,
                        });
                    })
                        .catch((err) => {
                        res.status(500).json({
                            status: 500,
                            message: "something went wrong when creating user.",
                            error: err,
                        });
                        next(err);
                    });
                }
                else if (role === "operator") {
                    permissions_1.default.create({
                        uid: result.dataValues.uid,
                        is_tracking_page: true,
                        is_tracking_page_insert: false,
                        is_tracking_page_update: false,
                        is_tracking_page_read: true,
                        is_tracking_page_delete: false,
                        is_customer_page: true,
                        is_customer_page_insert: false,
                        is_customer_page_update: false,
                        is_customer_page_read: true,
                        is_customer_page_delete: false,
                        is_service_page: true,
                        is_service_page_insert: false,
                        is_service_page_update: false,
                        is_service_page_read: true,
                        is_service_page_delete: false,
                        is_work_page: true,
                        is_work_page_insert: false,
                        is_work_page_update: false,
                        is_work_page_read: true,
                        is_work_page_delete: false,
                        is_admin_page: false,
                        is_admin_page_insert: false,
                        is_admin_page_update: false,
                        is_admin_page_read: false,
                        is_admin_page_delete: false,
                    })
                        .then(() => {
                        return res.json({
                            code: 200,
                            status: "success",
                            data: {
                                uid: result.dataValues.uid,
                            },
                            message: `建立人員成功。`,
                        });
                        next();
                    })
                        .catch((err) => {
                        return res.json({
                            code: 500,
                            status: "error",
                            data: null,
                            message: `建立人員時發生問題。 ${err}`,
                        });
                        next(err);
                    });
                }
                else if (role === "engineer") {
                    permissions_1.default.create({
                        uid: result.dataValues.uid,
                        is_tracking_page: true,
                        is_tracking_page_insert: false,
                        is_tracking_page_update: true,
                        is_tracking_page_read: true,
                        is_tracking_page_delete: false,
                        is_customer_page: true,
                        is_customer_page_insert: false,
                        is_customer_page_update: true,
                        is_customer_page_read: true,
                        is_customer_page_delete: false,
                        is_service_page: true,
                        is_service_page_insert: false,
                        is_service_page_update: true,
                        is_service_page_read: true,
                        is_service_page_delete: false,
                        is_work_page: true,
                        is_work_page_insert: false,
                        is_work_page_update: true,
                        is_work_page_read: true,
                        is_work_page_delete: false,
                        is_admin_page: false,
                        is_admin_page_insert: false,
                        is_admin_page_update: false,
                        is_admin_page_read: false,
                        is_admin_page_delete: false,
                    })
                        .then(() => {
                        return res.json({
                            code: 200,
                            status: "success",
                            data: {
                                uid: result.dataValues.uid,
                            },
                            message: `建立人員成功。`,
                        });
                    })
                        .catch((err) => {
                        return res.json({
                            code: 500,
                            status: "error",
                            data: null,
                            message: `建立人員時發生問題。 ${err}`,
                        });
                        next(err);
                    });
                }
            })
                .catch((err) => {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `建立人員時發生問題。 ${err}`,
                });
                next();
            });
        }
        else {
            return res.json({
                code: 401,
                status: "success",
                data: null,
                message: `此人員已存在。`,
            });
        }
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `建立人員時發生問題。 ${err}`,
        });
        next();
    });
};
exports.create_user = create_user;
const get_users = (_, res, next) => {
    user_1.default.findAll({ where: { is_del: false } })
        .then((users) => {
        return res.json({
            code: 200,
            status: "success",
            data: users,
            message: `取得人員成功。`,
        });
        next();
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得人員時發生問題。 ${err}`,
        });
        next();
    });
};
exports.get_users = get_users;
const get_user = (req, res, next) => {
    const { uid } = req.params;
    user_1.default.findOne({
        where: { uid: uid },
        include: {
            model: permissions_1.default,
            attributes: [
                "is_tracking_page",
                "is_tracking_page_insert",
                "is_tracking_page_update",
                "is_tracking_page_read",
                "is_tracking_page_delete",
                "is_customer_page",
                "is_customer_page_insert",
                "is_customer_page_update",
                "is_customer_page_read",
                "is_customer_page_delete",
                "is_service_page",
                "is_service_page_insert",
                "is_service_page_update",
                "is_service_page_read",
                "is_service_page_delete",
                "is_work_page",
                "is_work_page_insert",
                "is_work_page_update",
                "is_work_page_read",
                "is_work_page_delete",
                "is_admin_page",
                "is_admin_page_insert",
                "is_admin_page_update",
                "is_admin_page_read",
                "is_admin_page_delete",
            ],
        },
    })
        .then((user) => {
        return res.json({
            code: 200,
            status: "success",
            data: {
                ...user.dataValues,
                permission: user === null || user === void 0 ? void 0 : user.permission.dataValues,
            },
            message: `取得人員成功。`,
        });
    })
        .catch((err) => {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得人員時發生問題。 ${err}`,
        });
        next();
    });
};
exports.get_user = get_user;
const update_user = (req, res, next) => {
    try {
        const { uid, account, password, name, role, is_tracking_page, is_tracking_page_insert, is_tracking_page_update, is_tracking_page_read, is_tracking_page_delete, is_customer_page, is_customer_page_insert, is_customer_page_update, is_customer_page_read, is_customer_page_delete, is_service_page, is_service_page_insert, is_service_page_update, is_service_page_read, is_service_page_delete, is_work_page, is_work_page_insert, is_work_page_update, is_work_page_read, is_work_page_delete, is_admin_page, is_admin_page_insert, is_admin_page_update, is_admin_page_read, is_admin_page_delete, } = req.body;
        const { user } = req;
        const update_member = user === null || user === void 0 ? void 0 : user.uid;
        user_1.default.findOne({
            where: { uid: uid },
        }).then((user) => {
            user.account = account;
            user.name = name;
            user.role = role;
            if (password) {
                user.password = password;
            }
            user.update_member = update_member;
            user.save();
            permissions_1.default.findOne({
                where: { uid: uid },
            })
                .then((permission) => {
                permission.is_tracking_page = is_tracking_page;
                permission.is_tracking_page_insert = is_tracking_page_insert;
                permission.is_tracking_page_update = is_tracking_page_update;
                permission.is_tracking_page_read = is_tracking_page_read;
                permission.is_tracking_page_delete = is_tracking_page_delete;
                permission.is_customer_page = is_customer_page;
                permission.is_customer_page_insert = is_customer_page_insert;
                permission.is_customer_page_update = is_customer_page_update;
                permission.is_customer_page_read = is_customer_page_read;
                permission.is_customer_page_delete = is_customer_page_delete;
                permission.is_service_page = is_service_page;
                permission.is_service_page_insert = is_service_page_insert;
                permission.is_service_page_update = is_service_page_update;
                permission.is_service_page_read = is_service_page_read;
                permission.is_service_page_delete = is_service_page_delete;
                permission.is_work_page = is_work_page;
                permission.is_work_page_insert = is_work_page_insert;
                permission.is_work_page_update = is_work_page_update;
                permission.is_work_page_read = is_work_page_read;
                permission.is_work_page_delete = is_work_page_delete;
                permission.is_admin_page = is_admin_page;
                permission.is_admin_page_insert = is_admin_page_insert;
                permission.is_admin_page_update = is_admin_page_update;
                permission.is_admin_page_read = is_admin_page_read;
                permission.is_admin_page_delete = is_admin_page_delete;
                permission.update_member = update_member;
                permission.save();
                return res.json({
                    code: 200,
                    status: "success",
                    data: null,
                    message: `更新人員資料成功。`,
                });
                next();
            })
                .catch((err) => {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `更新人員資料時發生問題。 ${err}`,
                });
                next(err);
            });
        });
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `更新人員資料時發生問題。 ${err}`,
        });
        next(err);
    }
};
exports.update_user = update_user;
const delete_user = (req, res, next) => {
    const { uid } = req.params;
    const { user } = req;
    const update_member = user === null || user === void 0 ? void 0 : user.uid;
    try {
        user_1.default.findOne({ where: { uid: uid } })
            .then((user) => {
            user.is_del = true;
            user.update_member = update_member;
            user.save();
        })
            .then(() => {
            return res.json({
                code: 200,
                status: "success",
                data: null,
                message: `刪除人員成功。`,
            });
            next();
        })
            .catch((err) => {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `刪除人員資料時發生問題。 ${err}`,
            });
            next(err);
        });
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `刪除人員資料時發生問題。 ${err}`,
        });
        next(err);
    }
};
exports.delete_user = delete_user;

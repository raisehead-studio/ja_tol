"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_customer = exports.update_customer_detail = exports.create_customer_contact = exports.create_ele_place = exports.get_customers_detail = exports.get_customers_list = exports.create_customer = void 0;
const sequelize_1 = require("sequelize");
const customer_1 = __importDefault(require("../models/customer"));
const customer_contact_1 = __importDefault(require("../models/customer_contact"));
const ele_place_1 = __importDefault(require("../models/ele_place"));
const service_1 = __importDefault(require("../models/service"));
const user_1 = __importDefault(require("../models/user"));
const create_customer = (req, res, next) => {
    const { name, short_name, customer_number, ele_number, tax_id } = req.body;
    const { user } = req;
    customer_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: {
                customer_number: customer_number,
                name: name,
            },
        },
    })
        .then((customer) => {
        if (!customer || (customer && customer.is_del)) {
            customer_1.default.create({
                name: name,
                short_name: short_name,
                customer_number: customer_number,
                ele_number: ele_number,
                tax_id,
                factory_description: "系統內定，未編輯前 --> 進廠施工務必申請作業,,提供文件：勞保/團保/入廠證件/3H勞安證/動火申請/",
                acceptance_check_description: "系統內定，未編輯前 --> 前/中/後  之施工相片／產品保固一年／／／",
                tobill_description: "系統內定，未編輯前 --> 發票務必要註明P.O.編號",
                invoice_description: "系統內定，未編輯前 --> 本客戶固定都會議價10%以上,,所以報價者注意要先提高報價金額／本客戶有不良記錄,欠公司20萬,,請款刁難／本客戶為優質客戶不議價,,要求品質...等等",
                update_member: user === null || user === void 0 ? void 0 : user.uid,
                create_member: user === null || user === void 0 ? void 0 : user.uid,
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
        }
        else {
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
exports.create_customer = create_customer;
const get_customers_list = async (req, res, next) => {
    const { orderBy, orderType } = req.query;
    const users = await user_1.default.findAll({
        where: { is_del: false },
    });
    customer_1.default.findAll({
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
            model: ele_place_1.default,
            attributes: ["name", "address", "registration_member_number"],
        },
    })
        .then((result) => {
        if (orderBy && orderType) {
            if (orderBy === "notify_date" || orderBy === "update_date") {
                result.sort((a, b) => {
                    if (orderType === "asc") {
                        return a[orderBy.toString()] - b[orderBy.toString()];
                    }
                    else {
                        return b[orderBy.toString()] - a[orderBy.toString()];
                    }
                });
            }
            else {
                result.sort((a, b) => {
                    if (orderType === "asc") {
                        return a[orderBy.toString()].localeCompare(b[orderBy.toString()]);
                    }
                    else {
                        return b[orderBy.toString()].localeCompare(a[orderBy.toString()]);
                    }
                });
            }
        }
        return res.json({
            code: 200,
            status: "success",
            data: result.map((item) => {
                var _a, _b, _c;
                return {
                    cid: item.cid,
                    customer_number: item.customer_number,
                    short_name: item.short_name,
                    ele_place_name: ((_a = item.ele_place) === null || _a === void 0 ? void 0 : _a.name) || "",
                    ele_place_address: ((_b = item.ele_place) === null || _b === void 0 ? void 0 : _b.address) || "",
                    ele_number: item.ele_number,
                    registration_member_number: (_c = item.ele_place) === null || _c === void 0 ? void 0 : _c.registration_member_number,
                    update_member: users.filter((user) => user.uid === item.update_member)[0].name,
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
exports.get_customers_list = get_customers_list;
const get_customers_detail = (req, res, next) => {
    const cid = req.params.cid;
    let data;
    customer_1.default.findOne({
        where: { cid: cid },
        include: [
            {
                model: customer_contact_1.default,
            },
            {
                model: ele_place_1.default,
            },
            {
                model: service_1.default,
            },
        ],
    })
        .then((result) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!result) {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `找不到此客戶資料。`,
            });
        }
        else {
            let data = {};
            const dbResult = result.toJSON();
            data.cid = result.dataValues.cid;
            data.name = result.dataValues.name;
            data.short_name = result.dataValues.short_name;
            data.customer_number = result.dataValues.customer_number;
            data.ele_number = result.dataValues.ele_number;
            data.tax_id = dbResult.tax_id;
            data.acceptance_check_description =
                result.dataValues.acceptance_check_description;
            data.factory_description = result.dataValues.factory_description;
            data.assignment_description = result.dataValues.assignment_description;
            data.tobill_description = result.dataValues.tobill_description;
            data.invoice_description = result.dataValues.invoice_description;
            data.other_description = result.dataValues.other_description;
            data.customer_contacts = !Array.isArray(result.dataValues.customer_contacts)
                ? []
                : result.dataValues.customer_contacts.map((item) => {
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
            data.ele_place_name = ((_a = result.dataValues.ele_place) === null || _a === void 0 ? void 0 : _a.name) || "";
            data.ele_place_address = ((_b = result.dataValues.ele_place) === null || _b === void 0 ? void 0 : _b.address) || "";
            data.ele_place_owner = ((_c = result.dataValues.ele_place) === null || _c === void 0 ? void 0 : _c.owner) || "";
            data.registration_member_number =
                ((_d = result.dataValues.ele_place) === null || _d === void 0 ? void 0 : _d.registration_member_number) || "";
            data.ele_engineer = ((_e = result.dataValues.ele_place) === null || _e === void 0 ? void 0 : _e.ele_engineer) || "";
            data.taiwan_power_company =
                ((_f = result.dataValues.ele_place) === null || _f === void 0 ? void 0 : _f.taiwan_power_company) || "";
            data.government = ((_g = result.dataValues.ele_place) === null || _g === void 0 ? void 0 : _g.government) || "";
            data.test = ((_h = result.dataValues.ele_place) === null || _h === void 0 ? void 0 : _h.test) || "";
            data.customer_services = !Array.isArray(result.dataValues.customer_services)
                ? []
                : result.dataValues.customer_services.map((item) => {
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
exports.get_customers_detail = get_customers_detail;
const create_ele_place = (req, res, next) => {
    const { name, address, owner, cid, registration_member_number, ele_engineer, taiwan_power_company, government, test, } = req.body;
    const { user } = req;
    ele_place_1.default.findOne({
        where: { name: name || "" },
    })
        .then((ele_place) => {
        if (!ele_place) {
            ele_place_1.default.create({
                name: name,
                address: address,
                owner: owner,
                cid: cid,
                registration_member_number: registration_member_number,
                ele_engineer: ele_engineer,
                taiwan_power_company: taiwan_power_company,
                government: government,
                test: test,
                update_member: user === null || user === void 0 ? void 0 : user.uid,
                create_member: user === null || user === void 0 ? void 0 : user.uid,
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
        }
        else {
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
exports.create_ele_place = create_ele_place;
const create_customer_contact = (req, res, next) => {
    const { name, type, phone, job_description, title, cid, note, email } = req.body;
    const { user } = req;
    customer_contact_1.default.create({
        name: name,
        cid: cid,
        type: type,
        phone: phone,
        job_description: job_description,
        title: title,
        note: note,
        email: email,
        update_member: user === null || user === void 0 ? void 0 : user.uid,
        create_member: user === null || user === void 0 ? void 0 : user.uid,
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
exports.create_customer_contact = create_customer_contact;
const update_customer_detail = (req, res, next) => {
    const { cid, name, short_name, customer_number, ele_number, acceptance_check_description, factory_description, assignment_description, tobill_description, invoice_description, other_description, customer_contacts, customer_services, ele_place_name, ele_place_address, ele_place_owner, registration_member_number, ele_engineer, taiwan_power_company, government, test, } = req.body;
    const { user } = req;
    try {
        customer_1.default.findByPk(cid)
            .then((customer) => {
            customer.name = name;
            customer.short_name = short_name;
            customer.customer_number = customer_number;
            customer.ele_number = ele_number;
            customer.acceptance_check_description = acceptance_check_description;
            customer.factory_description = factory_description;
            customer.assignment_description = assignment_description;
            customer.tobill_description = tobill_description;
            customer.invoice_description = invoice_description;
            customer.update_member = user === null || user === void 0 ? void 0 : user.uid;
            customer.other_description = other_description;
            customer.save();
            let executions = [];
            JSON.parse(customer_contacts).forEach((contact) => {
                executions.push(customer_contact_1.default.findOne({
                    where: { ccid: contact.id },
                })
                    .then((customer_contact) => {
                    customer_contact.name = contact.name;
                    customer_contact.type = contact.type;
                    customer_contact.phone = contact.phone;
                    customer_contact.job_description = contact.job_description;
                    customer_contact.title = contact.title;
                    customer_contact.note = contact.note;
                    customer_contact.email = contact.email;
                    customer_contact.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    customer_contact.save();
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `編輯顧客基本資料時發生問題 ${err}。`,
                    });
                }));
            });
            JSON.parse(customer_services).forEach((service) => {
                executions.push(service_1.default.findOne({
                    where: { csid: service.id },
                })
                    .then((customer_service) => {
                    customer_service.title = service.title;
                    customer_service.notify_date = service.notify_date;
                    customer_service.update_member = user === null || user === void 0 ? void 0 : user.uid;
                    customer_service.save();
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `編輯顧客基本資料時發生問題 ${err}。`,
                    });
                }));
            });
            ele_place_1.default.findOne({
                where: { cid: cid },
            }).then((ele_place) => {
                if (!ele_place) {
                    ele_place_1.default.create({
                        name: ele_place_name,
                        address: ele_place_address,
                        owner: ele_place_owner,
                        cid: cid,
                        registration_member_number: registration_member_number,
                        ele_engineer: ele_engineer,
                        taiwan_power_company: taiwan_power_company,
                        government: government,
                        test: test,
                        update_member: user === null || user === void 0 ? void 0 : user.uid,
                        create_member: user === null || user === void 0 ? void 0 : user.uid,
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
                }
                else {
                    console.log(registration_member_number);
                    ele_place.name = ele_place_name || "";
                    ele_place.address = ele_place_address || "";
                    ele_place.owner = ele_place_owner || "";
                    ele_place.cid = cid;
                    ele_place.update_member = user === null || user === void 0 ? void 0 : user.uid;
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `編輯顧客基本資料時發生問題 ${err}。`,
        });
        next();
    }
};
exports.update_customer_detail = update_customer_detail;
const delete_customer = (req, res) => {
    try {
        const { cid } = req.params;
        const { user } = req;
        customer_1.default.findOne({ where: { cid: cid } })
            .then((customer) => {
            customer.is_del = true;
            customer.update_member = user === null || user === void 0 ? void 0 : user.uid;
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
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `刪除客戶時發生問題。 ${err}`,
        });
    }
};
exports.delete_customer = delete_customer;

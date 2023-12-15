"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const CustomerContact = db_1.sequelize.define("customer_contact", {
    ccid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    cid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
    },
    type: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        defaultValue: "work_execution" ||
            "work_dispatch" ||
            "site_admission" ||
            "acceptance_check" ||
            "to_bill" ||
            "others",
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    job_description: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    note: sequelize_1.default.STRING,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = CustomerContact;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const ToBillInvoice = db_1.sequelize.define("tobill_invoce", {
    tbiid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    tbid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
    },
    percentage: sequelize_1.default.STRING,
    date: sequelize_1.default.DATE,
    amount: sequelize_1.default.STRING,
    invoice_number: sequelize_1.default.STRING,
    sent_date: sequelize_1.default.DATE,
    note: sequelize_1.default.STRING,
    numbers_invoices: sequelize_1.default.STRING,
    numbers_reports: sequelize_1.default.STRING,
    numbers_general_forms: sequelize_1.default.STRING,
    numbers_inqualify_agreements: sequelize_1.default.STRING,
    numbers_envelope: sequelize_1.default.STRING,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = ToBillInvoice;

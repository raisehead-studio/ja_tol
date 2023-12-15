"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const CustomerNote = db_1.sequelize.define("customer_note", {
    cnid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    cid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    acceptance_check_description: sequelize_1.default.STRING,
    factory_description: sequelize_1.default.STRING,
    assignment_description: sequelize_1.default.STRING,
    tobill_description: sequelize_1.default.STRING,
    invoice_description: sequelize_1.default.STRING,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = CustomerNote;

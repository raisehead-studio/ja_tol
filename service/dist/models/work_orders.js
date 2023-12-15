"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const WorkOrder = db_1.sequelize.define("work_order", {
    cid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
    },
    woid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    invoice_number: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    order_number: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    inquiry_member: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    responsible_member: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    po: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    acceptance_check_date: sequelize_1.default.DATE,
    tobill_date: sequelize_1.default.DATE,
    factory_date: sequelize_1.default.DATE,
    assignment_date: sequelize_1.default.DATE,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
    price: sequelize_1.default.INTEGER,
});
exports.default = WorkOrder;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const Assignments = db_1.sequelize.define("assignments", {
    aid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    woid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
    },
    manufacturing_address: sequelize_1.default.STRING,
    manufacturing_status: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        defaultValue: "not_started",
    },
    manufacturing_date: sequelize_1.default.DATE,
    is_assign_manpower: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    power_stop_contact: sequelize_1.default.STRING,
    power_stop_phone1: sequelize_1.default.STRING,
    power_stop_phone2: sequelize_1.default.STRING,
    power_stop_date: sequelize_1.default.DATE,
    external_contact_is_holiday: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    external_contact_is_power_stop: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    external_contact_request_date: {
        type: sequelize_1.default.DATE,
        allowNull: false,
    },
    external_contact_receive_date: sequelize_1.default.DATE,
    tracking_date: sequelize_1.default.DATE,
    tracking_description: sequelize_1.default.STRING,
    tracking_is_finished: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    finished_date: sequelize_1.default.DATE,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = Assignments;

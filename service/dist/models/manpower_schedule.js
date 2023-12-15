"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const ManpowerSchedule = db_1.sequelize.define("manpower_schedule", {
    msid: {
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
    note: sequelize_1.default.STRING,
    schedule_date: sequelize_1.default.DATE,
    started_time: sequelize_1.default.DATE,
    finished_time: sequelize_1.default.DATE,
    actual_date: sequelize_1.default.DATE,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = ManpowerSchedule;

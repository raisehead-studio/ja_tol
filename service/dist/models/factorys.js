"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const Factory = db_1.sequelize.define("factory", {
    fid: {
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
    description: sequelize_1.default.STRING,
    tracking_date: sequelize_1.default.DATE,
    tracking_description: sequelize_1.default.STRING,
    tracking_is_finished: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    finished_date: sequelize_1.default.DATE,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = Factory;

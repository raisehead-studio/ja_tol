"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const Permissions = db_1.sequelize.define("permissions", {
    pid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    uid: sequelize_1.default.UUID,
    is_tracking_page: sequelize_1.default.BOOLEAN,
    is_tracking_page_insert: sequelize_1.default.BOOLEAN,
    is_tracking_page_update: sequelize_1.default.BOOLEAN,
    is_tracking_page_read: sequelize_1.default.BOOLEAN,
    is_tracking_page_delete: sequelize_1.default.BOOLEAN,
    is_customer_page: sequelize_1.default.BOOLEAN,
    is_customer_page_insert: sequelize_1.default.BOOLEAN,
    is_customer_page_update: sequelize_1.default.BOOLEAN,
    is_customer_page_read: sequelize_1.default.BOOLEAN,
    is_customer_page_delete: sequelize_1.default.BOOLEAN,
    is_service_page: sequelize_1.default.BOOLEAN,
    is_service_page_insert: sequelize_1.default.BOOLEAN,
    is_service_page_update: sequelize_1.default.BOOLEAN,
    is_service_page_read: sequelize_1.default.BOOLEAN,
    is_service_page_delete: sequelize_1.default.BOOLEAN,
    is_work_page: sequelize_1.default.BOOLEAN,
    is_work_page_insert: sequelize_1.default.BOOLEAN,
    is_work_page_update: sequelize_1.default.BOOLEAN,
    is_work_page_read: sequelize_1.default.BOOLEAN,
    is_work_page_delete: sequelize_1.default.BOOLEAN,
    is_admin_page: sequelize_1.default.BOOLEAN,
    is_admin_page_insert: sequelize_1.default.BOOLEAN,
    is_admin_page_update: sequelize_1.default.BOOLEAN,
    is_admin_page_read: sequelize_1.default.BOOLEAN,
    is_admin_page_delete: sequelize_1.default.BOOLEAN,
});
exports.default = Permissions;

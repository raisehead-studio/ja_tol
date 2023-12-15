"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const ElePlace = db_1.sequelize.define("ele_place", {
    epid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: sequelize_1.default.STRING,
    address: sequelize_1.default.STRING,
    owner: sequelize_1.default.STRING,
    cid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
    },
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
    registration_member_number: sequelize_1.default.STRING,
    ele_engineer: sequelize_1.default.STRING,
    taiwan_power_company: sequelize_1.default.STRING,
    government: sequelize_1.default.STRING,
    test: sequelize_1.default.STRING,
});
exports.default = ElePlace;

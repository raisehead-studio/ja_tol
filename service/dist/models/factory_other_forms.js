"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const FactoryOtherForm = db_1.sequelize.define("factory_other_form", {
    foid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    fid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        allowNull: false,
    },
    is_class: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    is_bunny_shoe: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    is_group_insurance: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    is_label_insurance: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    is_bunny_suit: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    other_form: sequelize_1.default.STRING,
    is_del: sequelize_1.default.BOOLEAN,
    update_member: sequelize_1.default.STRING,
    create_member: sequelize_1.default.STRING,
});
exports.default = FactoryOtherForm;

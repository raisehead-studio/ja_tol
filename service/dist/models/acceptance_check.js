"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../utils/db");
const AcceptanceCheck = db_1.sequelize.define("acceptance_check", {
  acid: {
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
  is_photo_before: {
    type: sequelize_1.default.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_photo_during: {
    type: sequelize_1.default.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_photo_after: {
    type: sequelize_1.default.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  power_switch_date1: sequelize_1.default.DATE,
  power_switch_date2: sequelize_1.default.DATE,
  power_switch_date3: sequelize_1.default.DATE,
  power_switch_date4: sequelize_1.default.DATE,
  defect_agreement: sequelize_1.default.STRING,
  report_type: sequelize_1.default.DATE,
  ew06_registration: sequelize_1.default.STRING,
  fom17_registration_government_date: sequelize_1.default.DATE,
  fom17_registration_ele_date: sequelize_1.default.DATE,
  is_inspection_report_retrieved: sequelize_1.default.BOOLEAN,
  is_inspection_report_retrieved_date: sequelize_1.default.DATE,
  is_warranty: {
    type: sequelize_1.default.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tracking_date: sequelize_1.default.DATE,
  tracking_description: sequelize_1.default.STRING,
  tracking_is_finished: {
    type: sequelize_1.default.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  finished_date: sequelize_1.default.DATE,
  wt_report_number: sequelize_1.default.STRING,
  is_del: sequelize_1.default.BOOLEAN,
  update_member: sequelize_1.default.STRING,
  create_member: sequelize_1.default.STRING,
});
exports.default = AcceptanceCheck;

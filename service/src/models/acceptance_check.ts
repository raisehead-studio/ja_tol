import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";
import exp from "constants";

const AcceptanceCheck = seq.define("acceptance_check", {
  acid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  woid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  description: Sequelize.STRING,
  is_photo_before: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_photo_during: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_photo_after: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  power_switch_date1: Sequelize.DATE,
  power_switch_date2: Sequelize.DATE,
  power_switch_date3: Sequelize.DATE,
  power_switch_date4: Sequelize.DATE,
  defect_agreement: Sequelize.STRING,
  report_type: Sequelize.STRING,
  ew06_registration: Sequelize.STRING,
  fom17_registration_government_date: Sequelize.DATE,
  fom17_registration_ele_date: Sequelize.DATE,
  is_warranty: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tracking_date: Sequelize.DATE,
  tracking_description: Sequelize.STRING,
  tracking_is_finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  finished_date: Sequelize.DATE,
  wt_report_number: Sequelize.STRING,
});

export default AcceptanceCheck;

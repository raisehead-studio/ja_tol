import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const Assignments = seq.define("assignments", {
  aid: {
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
  manufacturing_address: Sequelize.STRING,
  manufacturing_status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "not_started",
  },
  manufacturing_date: Sequelize.DATE,
  is_assign_manpower: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  power_stop_contact: Sequelize.STRING,
  power_stop_phone1: Sequelize.STRING,
  power_stop_phone2: Sequelize.STRING,
  power_stop_date: Sequelize.DATE,
  external_contact_is_holiday: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  external_contact_is_power_stop: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  external_contact_request_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  external_contact_receive_date: Sequelize.DATE,
  tracking_date: Sequelize.DATE,
  tracking_description: Sequelize.STRING,
  tracking_is_finished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tracking_finished_date: Sequelize.DATE,
});

export default Assignments;

import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const PowerStop = seq.define("power_stop", {
  psid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  aid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  area: Sequelize.STRING,
  started_date: Sequelize.DATE,
  finished_date: Sequelize.DATE,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
  other_description: Sequelize.STRING,
  stop_shift: Sequelize.STRING,
  request_date: Sequelize.DATE,
  receive_date: Sequelize.DATE,
  engineer: Sequelize.STRING,
  customer: Sequelize.STRING,
  tai_power_area: Sequelize.STRING,
  tai_power_notify_date: Sequelize.DATE,
  is_holiday: Sequelize.STRING,
});

export default PowerStop;

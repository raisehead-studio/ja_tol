import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const ManpowerSchedule = seq.define("manpower_schedule", {
  msid: {
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
  note: Sequelize.STRING,
  schedule_date: Sequelize.DATE,
  started_time: Sequelize.DATE,
  finished_time: Sequelize.DATE,
  actual_date: Sequelize.DATE,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
});

export default ManpowerSchedule;

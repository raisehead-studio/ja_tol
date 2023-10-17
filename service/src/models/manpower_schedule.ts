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
  started_time: Sequelize.TIME,
  finished_time: Sequelize.TIME,
  actual_date: Sequelize.DATE,
});

export default ManpowerSchedule;

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
});

export default PowerStop;

import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const ToBill = seq.define("tobill", {
  tbid: {
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
  tracking_date: Sequelize.DATE,
  tracking_description: Sequelize.STRING,
  tracking_is_finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  finished_date: Sequelize.DATE,
});

export default ToBill;

import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const Factory = seq.define("factory", {
  fid: {
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
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
  is_class: Sequelize.BOOLEAN,
  is_group_insurance: Sequelize.BOOLEAN,
  is_label_insurance: Sequelize.BOOLEAN,
  is_bunny_shoe: Sequelize.BOOLEAN,
  is_bunny_suit: Sequelize.BOOLEAN,
});

export default Factory;

import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const ElePlace = seq.define("ele_place", {
  epid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  owner: Sequelize.STRING,
  cid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
  registration_member_number: Sequelize.STRING,
  ele_engineer: Sequelize.STRING,
  taiwan_power_company: Sequelize.STRING,
  government: Sequelize.STRING,
  test: Sequelize.STRING,
});

export default ElePlace;

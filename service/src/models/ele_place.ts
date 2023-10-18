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
});

export default ElePlace;

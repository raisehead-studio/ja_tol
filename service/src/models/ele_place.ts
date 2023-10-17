import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const ElePlace = seq.define("ele_place", {
  epid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

export default ElePlace;

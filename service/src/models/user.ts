import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const User = seq.define("user", {
  uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  account: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
});

export default User;

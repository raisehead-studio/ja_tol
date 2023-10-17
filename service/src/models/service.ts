import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const CustomerService = seq.define("customer_service", {
  cid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  csid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  notify_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  update_member: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  create_member: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default CustomerService;

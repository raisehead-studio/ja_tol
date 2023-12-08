import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const Customer = seq.define("customer", {
  cid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  short_name: Sequelize.STRING,
  customer_number: Sequelize.STRING,
  name: Sequelize.STRING,
  ele_number: Sequelize.STRING,
  acceptance_check_description: Sequelize.STRING,
  factory_description: Sequelize.STRING,
  assignment_description: Sequelize.STRING,
  tobill_description: Sequelize.STRING,
  invoice_description: Sequelize.STRING,
  other_description: Sequelize.STRING,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
});

export default Customer;

import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const CustomerNote = seq.define("customer_note", {
  cnid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  cid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  acceptance_check_description: Sequelize.STRING,
  factory_description: Sequelize.STRING,
  assignment_description: Sequelize.STRING,
  tobill_description: Sequelize.STRING,
  invoice_description: Sequelize.STRING,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
});

export default CustomerNote;

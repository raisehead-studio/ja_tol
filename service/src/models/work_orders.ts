import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const WorkOrder = seq.define("work_order", {
  cid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  woid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  invoice_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  order_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  inquiry_member: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  responsible_member: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  po: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  acceptance_check_date: Sequelize.DATE,
  tobill_date: Sequelize.DATE,
  factory_date: Sequelize.DATE,
  assignment_date: Sequelize.DATE,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
});

export default WorkOrder;

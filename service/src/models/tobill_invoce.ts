import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const ToBillInvoice = seq.define("tobill_invoce", {
  tbiid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  tbid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  percentage: Sequelize.STRING,
  date: Sequelize.DATE,
  amount: Sequelize.INTEGER,
  invoice_number: Sequelize.STRING,
  sent_date: Sequelize.DATE,
  note: Sequelize.STRING,
  numbers_invoices: Sequelize.INTEGER,
  numbers_reports: Sequelize.INTEGER,
  numbers_general_forms: Sequelize.INTEGER,
  numbers_inqualify_agreements: Sequelize.INTEGER,
  numbers_envelope: Sequelize.INTEGER,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
});

export default ToBillInvoice;

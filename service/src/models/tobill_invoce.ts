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
  amount: Sequelize.STRING,
  invoice_number: Sequelize.STRING,
  sent_date: Sequelize.DATE,
  note: Sequelize.STRING,
  numbers_invoices: Sequelize.STRING,
  numbers_reports: Sequelize.STRING,
  numbers_general_forms: Sequelize.STRING,
  numbers_inqualify_agreements: Sequelize.STRING,
  numbers_envelope: Sequelize.STRING,
  is_del: Sequelize.BOOLEAN,
  update_member: Sequelize.STRING,
  create_member: Sequelize.STRING,
});

export default ToBillInvoice;

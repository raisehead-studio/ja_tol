import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const CustomerServiceContent = seq.define("customer_service_content", {
  cscid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  csid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

export default CustomerServiceContent;

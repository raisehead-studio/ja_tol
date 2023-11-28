import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const Permissions = seq.define("permissions", {
  pid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  uid: Sequelize.UUID,
  is_tracking_page: Sequelize.BOOLEAN,
  is_tracking_page_insert: Sequelize.BOOLEAN,
  is_tracking_page_update: Sequelize.BOOLEAN,
  is_tracking_page_read: Sequelize.BOOLEAN,
  is_tracking_page_delete: Sequelize.BOOLEAN,
  is_customer_page: Sequelize.BOOLEAN,
  is_customer_page_insert: Sequelize.BOOLEAN,
  is_customer_page_update: Sequelize.BOOLEAN,
  is_customer_page_read: Sequelize.BOOLEAN,
  is_customer_page_delete: Sequelize.BOOLEAN,
  is_service_page: Sequelize.BOOLEAN,
  is_service_page_insert: Sequelize.BOOLEAN,
  is_service_page_update: Sequelize.BOOLEAN,
  is_service_page_read: Sequelize.BOOLEAN,
  is_service_page_delete: Sequelize.BOOLEAN,
  is_work_page: Sequelize.BOOLEAN,
  is_work_page_insert: Sequelize.BOOLEAN,
  is_work_page_update: Sequelize.BOOLEAN,
  is_work_page_read: Sequelize.BOOLEAN,
  is_work_page_delete: Sequelize.BOOLEAN,
  is_admin_page: Sequelize.BOOLEAN,
  is_admin_page_insert: Sequelize.BOOLEAN,
  is_admin_page_update: Sequelize.BOOLEAN,
  is_admin_page_read: Sequelize.BOOLEAN,
  is_admin_page_delete: Sequelize.BOOLEAN,
});

export default Permissions;

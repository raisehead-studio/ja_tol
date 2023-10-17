import Sequelize from "sequelize";
import { sequelize as seq } from "../utils/db";

const FactoryOtherForm = seq.define("factory_other_form", {
  foid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  fid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  is_class: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  is_bunny_shoe: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  is_group_insurance: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  is_label_insurance: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  is_bunny_suit: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  other_form: Sequelize.STRING,
});

export default FactoryOtherForm;

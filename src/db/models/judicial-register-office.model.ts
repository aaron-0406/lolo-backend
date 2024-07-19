import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialRegisterOfficeType } from "../../app/judicial/types/judicial-register-office.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_REGISTER_OFFICE_TABLE = "JUDICIAL_REGISTER_OFFICE";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialRegisterOfficeSchema: ModelAttributes<
  JudicialRegisterOffice,
  JudicialRegisterOfficeType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_register_office",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  customerHasBankId: {
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    field: "updated_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    field: "deleted_at",
    type: DataTypes.DATE,
  },
};

class JudicialRegisterOffice extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.JUDICIAL_COLLATERAL, {
      as: "judicialCollateral",
      foreignKey: "registerOfficeId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_REGISTER_OFFICE_TABLE,
      modelName: JUDICIAL_REGISTER_OFFICE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JudicialRegisterOffice,
  JudicialRegisterOfficeSchema,
  JUDICIAL_REGISTER_OFFICE_TABLE,
};

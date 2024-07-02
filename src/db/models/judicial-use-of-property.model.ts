import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialUseOfPropertyType } from "../../app/judicial/types/judicial-use-of-property.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_USE_OF_PROPERTY_TABLE = "JUDICIAL_USE_OF_PROPERTY";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialUseOfPropertySchema: ModelAttributes<
  JudicialUseOfProperty,
  JudicialUseOfPropertyType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_use_of_property",
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

class JudicialUseOfProperty extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.JUDICIAL_COLLATERAL, {
      as: "judicialCollateral",
      foreignKey: "useOfPropertyId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_USE_OF_PROPERTY_TABLE,
      modelName: JUDICIAL_USE_OF_PROPERTY_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JudicialUseOfProperty,
  JudicialUseOfPropertySchema,
  JUDICIAL_USE_OF_PROPERTY_TABLE,
};

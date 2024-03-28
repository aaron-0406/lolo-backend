import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtAddressType } from "../../app/extrajudicial/types/ext-address-type.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const EXT_ADDRESS_TYPE_TABLE = "EXT_ADDRESS_TYPE";

const ExtAddressTypeSchema: ModelAttributes<ExtAddress, ExtAddressType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_address_type",
    type: DataTypes.INTEGER,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "address_type",
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

class ExtAddress extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: EXT_ADDRESS_TYPE_TABLE,
      modelName: EXT_ADDRESS_TYPE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default { EXT_ADDRESS_TYPE_TABLE, ExtAddressTypeSchema, ExtAddress };

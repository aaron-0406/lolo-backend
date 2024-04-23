import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtProductNameType } from "../../app/extrajudicial/types/ext-product-name";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const EXT_PRODUCT_NAME_TABLE = "EXT_PRODUCT_NAME";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const ExtProductNameSchema: ModelAttributes<
  ExtProductName,
  ExtProductNameType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_product_name",
    type: DataTypes.INTEGER,
  },
  productName: {
    field: "product_name",
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

class ExtProductName extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.PRODUCT, {
      as: "product",
      foreignKey: "extProductNameId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: EXT_PRODUCT_NAME_TABLE,
      modelName: EXT_PRODUCT_NAME_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default { EXT_PRODUCT_NAME_TABLE, ExtProductNameSchema, ExtProductName };

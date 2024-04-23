import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ProductType } from "../../app/extrajudicial/types/product.tyoe";
import clientModel from "./client.model";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import customerModel from "./customer.model";
import negotiationModel from "./negotiation.model";
import extProductNameModel from "./ext-product-name.model";

const PRODUCT_TABLE = "PRODUCT";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { EXT_PRODUCT_NAME_TABLE } = extProductNameModel;

const ProductSchema: ModelAttributes<
  Product,
  Omit<ProductType, "funcionarioId" | "cityId">
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_product",
    type: DataTypes.INTEGER,
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  clientId: {
    allowNull: false,
    field: "client_id",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerId: {
    allowNull: false,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: customerModel.CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  negotiationId: {
    allowNull: true,
    field: "negotiation_id_negotiation",
    type: DataTypes.INTEGER,
    references: {
      model: negotiationModel.NEGOTIATION_TABLE,
      key: "id_negotiation",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
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
  extProductNameId: {
    allowNull: true,
    field: "ext_product_name_id_ext_product_name",
    type: DataTypes.INTEGER,
    references: {
      model: EXT_PRODUCT_NAME_TABLE,
      key: "id_ext_product_name",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Product extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });
    this.belongsTo(models.CUSTOMER, { as: "customer" });
    this.belongsTo(models.NEGOTIATION, { as: "negotiation" });
    this.belongsTo(models.EXT_PRODUCT_NAME, { as: "extProductName" });
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: PRODUCT_TABLE,
      timestamps: false,
    };
  }
}

export default { PRODUCT_TABLE, ProductSchema, Product };

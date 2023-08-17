import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ProductType } from "../../app/extrajudicial/types/product.tyoe";
import clientModel from "./client.model";
import customerModel from "./customer.model";

const PRODUCT_TABLE = "PRODUCT";

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
  name: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  clientCode: {
    allowNull: false,
    field: "client_code_client",
    type: DataTypes.STRING(150),
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "code",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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
    onDelete: "CASCADE",
  },
};

class Product extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });
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

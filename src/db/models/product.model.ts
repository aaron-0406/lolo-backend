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
import negotiationModel from "./negotiation.model";

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
};

class Product extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });
    this.belongsTo(models.CUSTOMER, { as: "customer" });
    this.belongsTo(models.NEGOTIATION, { as: "negotiation" });
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

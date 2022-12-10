import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { CustomerType } from "../../app/customers/types/customer.type";

const CUSTOMER_TABLE = "CUSTOMER";

const CustomerSchema: ModelAttributes<Customer, CustomerType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_customer",
    type: DataTypes.INTEGER,
  },
  ruc: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(11),
  },
  companyName: {
    allowNull: false,
    field: "company_name",
    type: DataTypes.STRING(150),
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT("tiny"),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Customer extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: CUSTOMER_TABLE,
      timestamps: false,
    };
  }
}

export default { CUSTOMER_TABLE, CustomerSchema, Customer };
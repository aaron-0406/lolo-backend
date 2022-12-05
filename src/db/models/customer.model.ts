import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { CustomerType } from "../../types/customer.type";

const CUSTOMER_TABLE = "CUSTOMER";

const CustomerSchema: ModelAttributes<Customer, CustomerType> = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  ruc: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(11),
  },
  companyName: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT("tiny"),
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

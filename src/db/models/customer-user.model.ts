import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { CustomerUserType } from "../../app/customers/types/customer-user.type";

const CUSTOMER_USER_TABLE = "CUSTOMER_USER";

const CustomerUserSchema: ModelAttributes<CustomerUser, CustomerUserType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_customer_user",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  lastName: {
    allowNull: false,
    field: "last_name",
    type: DataTypes.STRING(100),
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  dni: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(8),
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(70),
  },
  password: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(70),
  },
  privilege: {
    allowNull: false,
    type: DataTypes.STRING(6),
  },
  createAt: {
    allowNull: false,
    field: "create_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class CustomerUser extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_USER_TABLE,
      modelName: CUSTOMER_USER_TABLE,
      timestamps: false,
    };
  }
}

export default { CUSTOMER_USER_TABLE, CustomerUserSchema, CustomerUser };

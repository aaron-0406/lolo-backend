import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { CustomerUserType } from "../../app/customers/types/customer-user.type";
import customerModel from "./customer.model";

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
  state: {
    allowNull: false,
    type: DataTypes.TINYINT({ length: 1 }),
  },
  createdAt: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "created_at",
    type: DataTypes.DATE,
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
};

class CustomerUser extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });

    this.hasMany(models.CLIENT, {
      as: "client",
      foreignKey: "customerUserId",
    });

    this.hasMany(models.COMMENT, {
      as: "comment",
      foreignKey: "customerUserId",
    });
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

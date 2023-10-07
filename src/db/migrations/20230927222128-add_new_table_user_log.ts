import { DataTypes, QueryInterface } from "sequelize";
import userLog from "../models/user-log.model";
import customerUserModel from "../models/customer-user.model";
import customerModel from "../models/customer.model";

const { USER_LOG_TABLE } = userLog;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(USER_LOG_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_user_log",
      type: DataTypes.INTEGER,
    },
    codeAction: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    entityId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    entity: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    ip: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    createAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    customerUserId: {
      allowNull: false,
      field: "customer_user_id_customer_user",
      type: DataTypes.INTEGER,
      references: {
        model: customerUserModel.CUSTOMER_USER_TABLE,
        key: "id_customer_user",
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
      onDelete: "NO ACTION",
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(USER_LOG_TABLE);
}

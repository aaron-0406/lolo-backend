import { DataTypes, QueryInterface } from "sequelize";
import rolesModel from "../models/roles.model";
import customerModel from "../models/customer.model";
import permissionModel from "../models/permission.model";
import rolePermissionModel from "../models/many-to-many/role-permission.model";
import customerUserModel from "../models/customer-user.model";
import userAppModel from "../models/user-app.model";

const { ROLE_TABLE } = rolesModel;
const { PERMISSION_TABLE } = permissionModel;
const { ROLE_PERMISSION_TABLE } = rolePermissionModel;
const { CUSTOMER_TABLE } = customerModel;
const { CUSTOMER_USER_TABLE } = customerUserModel;
const { USER_APP_TABLE } = userAppModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(ROLE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_role",
      type: DataTypes.INTEGER,
    },
    name: { type: DataTypes.STRING(150), allowNull: false },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "customer_id_customer",
      references: {
        model: CUSTOMER_TABLE,
        key: "id_customer",
      },
    },
  });
  await queryInterface.addConstraint(ROLE_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "fk_role_customer",
    references: {
      table: CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.createTable(PERMISSION_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_permission",
      type: DataTypes.INTEGER,
    },
    name: { type: DataTypes.STRING(150), allowNull: false },
    code: { type: DataTypes.STRING(150), allowNull: false },
    icon: { type: DataTypes.STRING(150), allowNull: false },
  });
  await queryInterface.createTable(ROLE_PERMISSION_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_role_permission",
      type: DataTypes.INTEGER,
    },
    permissionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "permission_id_permission",
      references: {
        model: PERMISSION_TABLE,
        key: "id_permission",
      },
    },
    roleId: {
      allowNull: false,
      field: "role_id_role",
      type: DataTypes.INTEGER,
      references: {
        model: ROLE_TABLE,
        key: "id_role",
      },
    },
  });
  await queryInterface.addConstraint(ROLE_PERMISSION_TABLE, {
    fields: ["permission_id_permission"],
    type: "foreign key",
    name: "fk_role_permission_permission",
    references: {
      table: PERMISSION_TABLE,
      field: "id_permission",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(ROLE_PERMISSION_TABLE, {
    fields: ["role_id_role"],
    type: "foreign key",
    name: "fk_role_permission_role",
    references: {
      table: ROLE_TABLE,
      field: "id_role",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addColumn(CUSTOMER_USER_TABLE, 'role_id', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });
  await queryInterface.addColumn(USER_APP_TABLE, 'role_id', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(ROLE_TABLE, "fk_role_customer");
  await queryInterface.removeConstraint(ROLE_PERMISSION_TABLE, "fk_role_permission_permission");
  await queryInterface.removeConstraint(ROLE_PERMISSION_TABLE, "fk_role_permission_role");
  await queryInterface.dropTable(ROLE_TABLE);
  await queryInterface.dropTable(PERMISSION_TABLE);
  await queryInterface.dropTable(ROLE_PERMISSION_TABLE);
}

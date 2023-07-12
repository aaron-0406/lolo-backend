import { DataTypes, QueryInterface } from "sequelize";
import goalModel from "../models/goal.model";
import goalUserModel from "../models/goal-user.model";
import customerUserModel from "../models/customer-user.model";
import customerModel from "../models/customer.model";

const { GOAL_USER_TABLE } = goalUserModel;
const { CUSTOMER_USER_TABLE } = customerUserModel;
const { GOAL_TABLE } = goalModel;
const { CUSTOMER_TABLE } = customerModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(GOAL_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_goal",
      type: DataTypes.INTEGER,
    },
    startDate: {
      allowNull: false,
      field: "start_date",
      type: DataTypes.DATEONLY,
    },
    endDate: {
      allowNull: false,
      field: "end_date",
      type: DataTypes.DATEONLY,
    },
    week: {
      allowNull: false,
      field: "week",
      type: DataTypes.INTEGER,
    },
    customerUserId: {
      allowNull: false,
      field: "customer_id_customer",
      references: {
        model: CUSTOMER_TABLE,
        key: "id_customer",
      },
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
  });
  await queryInterface.addConstraint(GOAL_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "fk_goal_customer",
    references: {
      table: CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.createTable(GOAL_USER_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_goal_user",
      type: DataTypes.INTEGER,
    },
    quantity: {
      allowNull: false,
      field: "quantity",
      type: DataTypes.INTEGER,
    },
    goalId: {
      allowNull: false,
      field: "goal_id_goal",
      references: {
        model: GOAL_TABLE,
        key: "id_goal",
      },
      type: DataTypes.INTEGER,
    },
    customerUserId: {
      allowNull: false,
      field: "customer_user_id_customer_user",
      references: {
        model: CUSTOMER_USER_TABLE,
        key: "id_customer_user",
      },
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
  });

  await queryInterface.addConstraint(GOAL_USER_TABLE, {
    fields: ["customer_user_id_customer_user"],
    type: "foreign key",
    name: "fk_goal_user_customer_user",
    references: {
      table: CUSTOMER_USER_TABLE,
      field: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.addConstraint(GOAL_USER_TABLE, {
    fields: ["goal_id_goal"],
    type: "foreign key",
    name: "fk_goal_user_goal",
    references: {
      table: GOAL_TABLE,
      field: "id_goal",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(
    GOAL_USER_TABLE,
    "fk_goal_user_customer_user"
  );
  await queryInterface.removeConstraint(GOAL_USER_TABLE, "fk_goal_user_goal");
  await queryInterface.dropTable(GOAL_USER_TABLE);
  await queryInterface.dropTable(GOAL_TABLE);
}

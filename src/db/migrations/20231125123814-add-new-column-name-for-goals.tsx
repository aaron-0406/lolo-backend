import { DataTypes, QueryInterface } from "sequelize";
import goalModel from "../models/goal.model";

const { GOAL_TABLE } = goalModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(GOAL_TABLE, "name", {
    allowNull: false,
    type: DataTypes.STRING(200),
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(GOAL_TABLE, "name");
}

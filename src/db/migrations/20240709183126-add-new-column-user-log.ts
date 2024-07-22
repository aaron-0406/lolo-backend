import { DataTypes, QueryInterface } from "sequelize";
import userLogModel from "../models/user-log.model";

const { USER_LOG_TABLE } = userLogModel

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(USER_LOG_TABLE, "method_summary", {
    allowNull: true,
    field: "method_summary",
    type: DataTypes.TEXT("long"),
  });


}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(USER_LOG_TABLE, "method_summary");
}
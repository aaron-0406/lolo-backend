import { QueryInterface, DataTypes } from "sequelize";
import clientModel from "../models/client.model";

const { CLIENT_TABLE } = clientModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CLIENT_TABLE, "memo_assignment_date", {
    allowNull: true,
    field: "memo_assignment_date",
    type: DataTypes.DATEONLY,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CLIENT_TABLE, "memo_assignment_date");
}
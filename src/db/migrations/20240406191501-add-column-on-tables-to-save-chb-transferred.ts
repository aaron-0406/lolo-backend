import { DataTypes, QueryInterface } from "sequelize";
import clientModel from "../models/client.model";

const { CLIENT_TABLE } = clientModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CLIENT_TABLE, "chb_transferred", {
    allowNull: true,
    field: "chb_transferred",
    type: DataTypes.INTEGER,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CLIENT_TABLE, "chb_transferred");
}

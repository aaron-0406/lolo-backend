import { QueryInterface, DataTypes } from "sequelize";
import clientModel from "../models/client.model";

const { CLIENT_TABLE } = clientModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CLIENT_TABLE, "is_archived", {
    allowNull: false,
    field: "is_archived",
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CLIENT_TABLE, "is_archived");
}

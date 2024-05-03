import { DataTypes, QueryInterface } from "sequelize";
import judicialBinFileModel from "../models/judicial-bin-file.model";

const { JUDICIAL_BIN_FILE } = judicialBinFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_BIN_FILE, "size", {
    allowNull: false,
    field: "size",
    type: DataTypes.INTEGER,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_BIN_FILE, "size");
}

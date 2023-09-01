import { DataTypes, QueryInterface } from "sequelize";
import fileModel from "../models/file.model";
const { FILE_TABLE } = fileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(FILE_TABLE, "name", {
    type: DataTypes.TEXT("long"),
  });
  await queryInterface.changeColumn(FILE_TABLE, "originalname", {
    type: DataTypes.TEXT("long"),
  });
}

export async function down(queryInterface: QueryInterface) {}

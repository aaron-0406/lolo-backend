import { DataTypes, QueryInterface } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import cityModel from "../models/city.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "city_id_city", {
    allowNull: true,
    field: "city_id_city",
    type: DataTypes.INTEGER,
    references: {
      model: cityModel.CITY_TABLE,
      key: "id_city",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "city_id_city");
}

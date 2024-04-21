import { DataTypes, QueryInterface } from "sequelize";
import judicialCourtModel from "../models/judicial-court.model";
import cityModel from "../models/city.model";

const { JUDICIAL_COURT_TABLE } = judicialCourtModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_COURT_TABLE, "city_id_city", {
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
  await queryInterface.removeColumn(JUDICIAL_COURT_TABLE, "city_id_city");
}

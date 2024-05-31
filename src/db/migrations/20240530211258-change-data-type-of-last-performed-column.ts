import { DataTypes, QueryInterface } from "sequelize";
import judicialBinnacleModel from "../models/judicial-binnacle.model";
const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(JUDICIAL_BINNACLE_TABLE, "last_performed", {
    type: DataTypes.TEXT("long"),
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(JUDICIAL_BINNACLE_TABLE, "last_performed", {
    type: DataTypes.STRING(400),
  });
}

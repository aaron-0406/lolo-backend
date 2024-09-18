import { QueryInterface, DataTypes } from "sequelize";
import JudicialCollateralModel from "../models/judicial-collateral.model";

const { JUDICIAL_COLLATERAL_TABLE } = JudicialCollateralModel;

export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.changeColumn(JUDICIAL_COLLATERAL_TABLE, "number_of_collateral",{
      type: DataTypes.STRING(150),
    })
  } catch (error) {
    console.log(error)
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.changeColumn(JUDICIAL_COLLATERAL_TABLE, "number_of_collateral",{
      type: DataTypes.INTEGER,
    })
  } catch (error) {
    console.log(error)
  }
}


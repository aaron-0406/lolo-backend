import { DataTypes, QueryInterface } from "sequelize";
import JudicialCollateralChargesEncumbrancesModel from "../models/judicial-collateral-charges-encumbrances.model";

const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE } = JudicialCollateralChargesEncumbrancesModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE, "appraisal_date", {
    allowNull: true,
    field: "appraisal_date",
    type: DataTypes.DATE,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE, "appraisal_date");
}


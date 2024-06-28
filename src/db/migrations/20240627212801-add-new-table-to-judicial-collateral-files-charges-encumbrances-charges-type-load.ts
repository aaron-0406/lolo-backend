import { DataTypes, QueryInterface } from "sequelize";

import judicialCollateralChargesEncumbrancesTypeLoadModel from "../models/judicial-collateral-charges-encumbrances-type-load.model";
import judicialCollateralChargesEncumbrancesModel from "../models/judicial-collateral-charges-encumbrances.model";
import judicialCollateralFilesModel from "../models/judicial-collateral-files.model";
import judicialCollateralModel from "../models/judicial-collateral.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE } = judicialCollateralChargesEncumbrancesTypeLoadModel;
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE } = judicialCollateralChargesEncumbrancesModel;
const { JUDICIAL_COLLATERAL_FILES_TABLE } = judicialCollateralFilesModel;
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable( JUDICIAL_COLLATERAL_FILES_TABLE, {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_judicial_collateral_files",
    },
    nameOriginAws: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      field: "name_origin_aws",
    },
    originalName: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      field: "original_name",
    },
    judicialCollateralIdJudicialCollateral: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "judicial_collateral_id_judicial_collateral",
      references: {
        model: JUDICIAL_COLLATERAL_TABLE,
        key: "id_judicial_collateral",
      }
    },
    customerHasBankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      }
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  });

  await queryInterface.createTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE, {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_judicial_collateral_charges_encumbrances_type_load",
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "name",
    },
    customerHasBankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      references: {
        model: "CUSTOMER_HAS_BANK",
        key: "id_customer_has_bank",
      }
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  });

  await queryInterface.createTable( JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE, {
    id: {
      type: DataTypes.INTEGER,
      field: "id_judicial_collateral_charges_encumbrances",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    judicialCollateralIdJudicialCollateral:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "judicial_collateral_id_judicial_collateral",
      references: {
        model: JUDICIAL_COLLATERAL_TABLE,
        key: "id_judicial_collateral",
      }
    },
    idTypeOfLoad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_type_of_load",
      references:{
        model: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
        key: "id_judicial_collateral_charges_encumbrances_type_load",
      }
    },
    amountOfImpactSoles: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: "amount_of_impact_soles",
    },
    amountOfImpactDollars: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: "amount_of_impact_dollars",
    },
    descriptionOfLoad:{
      type: DataTypes.TEXT("long"),
      allowNull: false,
      field: "description_of_load",
    },
    registrationSeat:{
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "registration_seat",
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "registration_date",
    },
    range:{
      type: DataTypes.STRING,
      allowNull: false,
      field: "range",
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  });

}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE);
  await queryInterface.dropTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE);
  await queryInterface.dropTable(JUDICIAL_COLLATERAL_FILES_TABLE);
}
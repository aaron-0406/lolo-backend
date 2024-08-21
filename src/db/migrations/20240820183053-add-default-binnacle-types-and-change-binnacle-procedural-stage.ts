import { QueryInterface, QueryTypes, DataTypes } from "sequelize";
import judicialBinnacleModel from "../models/judicial-binnacle.model"
import judicialBinTypeBinnacleModel from "../models/judicial-bin-type-binnacle.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";
import judicialBinProceduralStageModel from "../models/judicial-bin-procedural-stage.model";

const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicialBinTypeBinnacleModel
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicialBinProceduralStageModel

type resCustomerHasBank = {
  id_customer_has_bank: number
}

export async function up(queryInterface: QueryInterface) {
  try {
    const customerHasBanIds: resCustomerHasBank[] = await queryInterface.sequelize.query(
      `SELECT id_customer_has_bank FROM ${CUSTOMER_HAS_BANK_TABLE} WHERE id_customer_has_bank IS NOT NULL`,
      { type: QueryTypes.SELECT }
    );

    for (const customerHasBank of customerHasBanIds) {
      const customerHasBankId = customerHasBank.id_customer_has_bank;
      const typeBinnacles = await queryInterface.sequelize.query(
        `SELECT type_binnacle FROM ${JUDICIAL_BIN_TYPE_BINNACLE_TABLE} WHERE customer_has_bank_id_customer_has_bank = :customerHasBankId`,
        {
          type: QueryTypes.SELECT,
          replacements: { customerHasBankId }
        }
      );

      const hasResolutionType = typeBinnacles.some((binnacle:any )=> binnacle.type_binnacle === "RESOLUCION");
      const hasEscritoType = typeBinnacles.some((binnacle:any )=> binnacle.type_binnacle === "ESCRITO");

      if (!hasResolutionType) {
        await queryInterface.sequelize.query(
          `INSERT INTO ${JUDICIAL_BIN_TYPE_BINNACLE_TABLE} (customer_has_bank_id_customer_has_bank, type_binnacle, created_at, updated_at) VALUES (:customerHasBankId, "RESOLUCION", NOW(), NOW())`,
          { replacements: { customerHasBankId } }
        );
      }

      if (!hasEscritoType) {
        await queryInterface.sequelize.query(
          `INSERT INTO ${JUDICIAL_BIN_TYPE_BINNACLE_TABLE} (customer_has_bank_id_customer_has_bank, type_binnacle, created_at, updated_at) VALUES (:customerHasBankId, "ESCRITO", NOW(), NOW())`,
          { replacements: { customerHasBankId } }
        );
      }
    }

  } catch (error) {
    console.error("Error during bulk insert:", error);
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.sequelize.query(
      `ALTER TABLE ${JUDICIAL_BINNACLE_TABLE} DROP COLUMN judicial_bin_procedural_stage_id_judicial_bin_procedural_stage`
    );
  } catch (error) {
    console.error("Error during bulk insert:", error);
  }
}
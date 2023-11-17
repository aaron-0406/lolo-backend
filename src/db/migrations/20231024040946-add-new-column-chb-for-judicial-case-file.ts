import { DataTypes, QueryInterface } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(
    JUDICIAL_CASE_FILE_TABLE,
    "customer_has_bank_id",
    {
      allowNull: false,
      field: "customer_has_bank_id",
      type: DataTypes.INTEGER,
      references: {
        model: customerHasBankModel.CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    JUDICIAL_CASE_FILE_TABLE,
    "customer_has_bank_id"
  );
}

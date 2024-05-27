import { DataTypes, QueryInterface } from "sequelize";
import judicialSedeModel from "../models/judicial-sede.model";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_SEDE_TABLE } = judicialSedeModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "judicial_venue");

  await queryInterface.createTable(JUDICIAL_SEDE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_sede",
      type: DataTypes.INTEGER,
    },
    sede: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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

  await queryInterface.addColumn(
    JUDICIAL_CASE_FILE_TABLE,
    "judicial_sede_id_judicial_sede",
    {
      allowNull: true,
      field: "judicial_sede_id_judicial_sede",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_SEDE_TABLE,
        key: "id_judicial_sede",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    JUDICIAL_CASE_FILE_TABLE,
    "judicial_sede_id_judicial_sede"
  );
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "judicial_venue", {
    field: "judicial_venue",
    allowNull: true,
    type: DataTypes.STRING(150),
  });

  await queryInterface.dropTable(JUDICIAL_SEDE_TABLE);
}

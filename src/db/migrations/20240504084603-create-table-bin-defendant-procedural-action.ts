import { DataTypes, QueryInterface } from "sequelize";
import judicialBinnacleModel from "../models/judicial-binnacle.model";
("../models/judicial-binnacle.model");
("../models/judicial-bin-procedural-stage.model");
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;
const JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE =
  "JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(
    JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_defendant_procedural_action",
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      defendantProceduralAction: {
        allowNull: false,
        field: "defendant_procedural_action",
        type: DataTypes.STRING(150),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
      customerHasBankId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "customer_has_bank_id_customer_has_bank",
        references: {
          model: CUSTOMER_HAS_BANK_TABLE,
          key: "id_customer_has_bank",
        },
      },
    }
  );

  await queryInterface.addColumn(
    JUDICIAL_BINNACLE_TABLE,
    "defendant_procedural_action_id",
    {
      allowNull: true,
      field: "defendant_procedural_action_id",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
        key: "id_defendant_procedural_action",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    JUDICIAL_BINNACLE_TABLE,
    "defendant_procedural_action_id"
  );
  await queryInterface.dropTable(
    JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE
  );
}

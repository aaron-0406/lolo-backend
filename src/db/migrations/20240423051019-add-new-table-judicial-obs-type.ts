import { DataTypes, QueryInterface } from "sequelize";
import judicialObsTypeModel from "../models/judicial-obs-type.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_OBS_TYPE_TABLE } = judicialObsTypeModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

function createJudicialObsType(type: string, chb: number) {
  return {
    type: type,
    customer_has_bank_id_customer_has_bank: chb,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };
}

const newJudicialObsTypes = [
  createJudicialObsType("CONTINGENCIAS DEL PROCESO", 1),
  createJudicialObsType("TRANSFERENCIA DE INMUEBLES", 1),
  createJudicialObsType("ALERTAS REGISTRALES", 1),
  createJudicialObsType("SE PROPONDRÁ PARA CASTIGO", 1),
  createJudicialObsType("BÚSQUEDAS REGISTRALES", 1),
  createJudicialObsType("BÚSQUEDAS INDECOPI", 1),
  createJudicialObsType("BÚSQUEDA ZONA DE TRABAJO", 1),
  createJudicialObsType("BÚSQUEDAS PROCESALES OTROS JUZGADOS", 1),
  createJudicialObsType("CONTINGENCIAS DEL PROCESO", 12),
  createJudicialObsType("TRANSFERENCIA DE INMUEBLES", 12),
  createJudicialObsType("ALERTAS REGISTRALES", 12),
  createJudicialObsType("SE PROPONDRÁ PARA CASTIGO", 12),
  createJudicialObsType("BÚSQUEDAS REGISTRALES", 12),
  createJudicialObsType("BÚSQUEDAS INDECOPI", 12),
  createJudicialObsType("BÚSQUEDA ZONA DE TRABAJO", 12),
  createJudicialObsType("BÚSQUEDAS PROCESALES OTROS JUZGADOS", 12),
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_OBS_TYPE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_obs_type",
      type: DataTypes.INTEGER,
    },
    type: {
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

  await queryInterface.bulkInsert(JUDICIAL_OBS_TYPE_TABLE, newJudicialObsTypes);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(JUDICIAL_OBS_TYPE_TABLE);
}

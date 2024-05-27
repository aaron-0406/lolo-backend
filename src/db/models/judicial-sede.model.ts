import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialSedeType } from "../../app/judicial/types/judicial-sede.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_SEDE_TABLE = "JUDICIAL_SEDE";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialSedeSchema: ModelAttributes<JudicialSede, JudicialSedeType> = {
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
};

class JudicialSede extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.JUDICIAL_CASE_FILE, {
      as: "judicialCaseFile",
      foreignKey: "judicialSedeId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_SEDE_TABLE,
      modelName: JUDICIAL_SEDE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_SEDE_TABLE,
  JudicialSedeSchema,
  JudicialSede,
};

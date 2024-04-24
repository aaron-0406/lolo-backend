import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialObservationType } from "../../app/judicial/types/judicial-observation.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import judicialCaseFileModel from "./judicial-case-file.model";
import judicialObsTypeModel from "./judicial-obs-type.model";

const JUDICIAL_OBSERVATION_TABLE = "JUDICIAL_OBSERVATION";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { JUDICIAL_OBS_TYPE_TABLE } = judicialObsTypeModel;

const JudicialObservationSchema: ModelAttributes<
  JudicialObservation,
  JudicialObservationType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_observation",
    type: DataTypes.INTEGER,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  comment: {
    allowNull: false,
    type: DataTypes.TEXT("long"),
  },
  judicialCaseFileId: {
    allowNull: false,
    field: "judicial_case_file_id_judicial_case_file",
    type: DataTypes.INTEGER,
    references: {
      model: JUDICIAL_CASE_FILE_TABLE,
      key: "id_judicial_case_file",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  judicialObsTypeId: {
    allowNull: false,
    field: "judicial_obs_type_id_judicial_obs_type",
    type: DataTypes.INTEGER,
    references: {
      model: JUDICIAL_OBS_TYPE_TABLE,
      key: "id_judicial_obs_type",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
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

class JudicialObservation extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.belongsTo(models.JUDICIAL_CASE_FILE, { as: "judicialCaseFile" });
    this.belongsTo(models.JUDICIAL_OBS_TYPE, { as: "judicialObsType" });

    // this.hasMany(models.JUDICIAL_OBS_FILE, {
    //   as: "judicialObsFile",
    //   foreignKey: "judicialObservationId",
    // });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_OBSERVATION_TABLE,
      modelName: JUDICIAL_OBSERVATION_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_OBSERVATION_TABLE,
  JudicialObservationSchema,
  JudicialObservation,
};

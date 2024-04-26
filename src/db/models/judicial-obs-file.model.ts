import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialObsFileType } from "../../app/judicial/types/judicial-obs-file.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import judicialObservationModel from "./judicial-observation.model";

const JUDICIAL_OBS_FILE_TABLE = "JUDICIAL_OBS_FILE";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { JUDICIAL_OBSERVATION_TABLE } = judicialObservationModel;

const JudicialObservationSchema: ModelAttributes<
  JudicialObservation,
  JudicialObsFileType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_obs_file",
    type: DataTypes.INTEGER,
  },
  awsName: {
    allowNull: false,
    field: "aws_name",
    type: DataTypes.TEXT("long"),
  },
  originalName: {
    allowNull: false,
    field: "original_name",
    type: DataTypes.TEXT("long"),
  },
  judicialObservationId: {
    allowNull: false,
    field: "judicial_observation_id_judicial_observation",
    type: DataTypes.INTEGER,
    references: {
      model: JUDICIAL_OBSERVATION_TABLE,
      key: "id_judicial_observation",
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
    this.belongsTo(models.JUDICIAL_OBSERVATION, { as: "judicialObservation" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_OBS_FILE_TABLE,
      modelName: JUDICIAL_OBS_FILE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_OBS_FILE_TABLE,
  JudicialObservationSchema,
  JudicialObservation,
};

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialObsTypeType } from "../../app/judicial/types/judicial-obs-type.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_OBS_TYPE_TABLE = "JUDICIAL_OBS_TYPE";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialObsTypeSchema: ModelAttributes<
  JudicialObsType,
  JudicialObsTypeType
> = {
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
};

class JudicialObsType extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.JUDICIAL_OBSERVATION, {
      as: "judicialObservation",
      foreignKey: "judicialObsTypeId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_OBS_TYPE_TABLE,
      modelName: JUDICIAL_OBS_TYPE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_OBS_TYPE_TABLE,
  JudicialObsTypeSchema,
  JudicialObsType,
};

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialCaseFileHasCollateralType } from "../../app/judicial/types/judicial-case-file-has-collateral.type";
import judicialCollateralModel from "./judicial-collateral.model";
import judicialCaseFileModel from "./judicial-case-file.model";

const JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE = "JUDICIAL_CASE_FILE_HAS_COLLATERAL";
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

const JudicialCaseFileHasCollateralSchema: ModelAttributes<JudicialCaseFileHasCollateral, JudicialCaseFileHasCollateralType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_case_file_has_collateral",
    type: DataTypes.INTEGER,
  },
  judicialCaseFileId: {
    allowNull: false,
    field: "judicial_case_file_id",
    type: DataTypes.INTEGER,
    references: {
      model: JUDICIAL_CASE_FILE_TABLE,
      key: "id_judicial_case_file",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  judicialCollateralId: {
    allowNull: false,
    field: "judicial_collateral_id",
    type: DataTypes.INTEGER,
    references: {
      model: JUDICIAL_COLLATERAL_TABLE,
      key: "id_judicial_collateral",
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

class JudicialCaseFileHasCollateral extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.JUDICIAL_CASE_FILE, { as: "judicialCaseFile" });
    this.belongsTo(models.JUDICIAL_COLLATERAL, { as: "judicialCollateral" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
      modelName: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
      timestamps: true,
    };
  }
}

export default {
  JudicialCaseFileHasCollateral,
  JudicialCaseFileHasCollateralSchema,
  JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
}


import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { DistrictType } from "../../../app/settings/types/district.type";
import provinceModel from "./province.model";

const DISTRICT_TABLE = "DISTRICT";
const { PROVINCE_TABLE } = provinceModel;

const DistrictSchema: ModelAttributes<District, DistrictType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_district",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(150),
  },
  code: {
    allowNull: false,
    field: "code",
    type: DataTypes.STRING(10),
  },
  provinceId: {
    allowNull: false,
    field: "province_id_province",
    references: {
      model: PROVINCE_TABLE,
      key: "id_province",
    },
    type: DataTypes.INTEGER,
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

class District extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.PROVINCE, { as: "province" });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: DISTRICT_TABLE,
      modelName: DISTRICT_TABLE,
      timestamps: false,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  DISTRICT_TABLE,
  DistrictSchema,
  District,
};

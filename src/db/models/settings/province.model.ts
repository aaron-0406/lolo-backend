import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ProvinceType } from "../../../app/settings/types/province.type";
import departmentModel from "./department.model";
const PROVINCE_TABLE = "PROVINCE";
const { DEPARTMENT_TABLE } = departmentModel;

const ProvinceSchema: ModelAttributes<Province, ProvinceType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_province",
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
  departmentId: {
    allowNull: false,
    field: "department_id_department",
    references:{
      model: DEPARTMENT_TABLE,
      key: "id_department",
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
}

class Province extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.DEPARTMENT, { as: "department" });
    this.hasMany(models.DISTRICT, { as: "district", foreignKey: "provinceId"});
    this.hasMany(models.JUDICIAL_COLLATERAL, {
      as: "judicialCollateral",
      foreignKey: "provinceId",
    });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PROVINCE_TABLE,
      modelName: PROVINCE_TABLE,
      timestamps: false,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  PROVINCE_TABLE,
  ProvinceSchema,
  Province,
}
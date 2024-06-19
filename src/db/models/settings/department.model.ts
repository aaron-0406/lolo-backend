import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { DepartmentType } from "../../../app/settings/types/department.type";

const DEPARTMENT_TABLE = "DEPARTMENT";

const DepartmentSchema: ModelAttributes<Department, DepartmentType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    field: "id_department",
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
  }
};

class Department extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.PROVINCE, { as: "province", foreignKey:"departmentId"});
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: DEPARTMENT_TABLE,
      modelName: DEPARTMENT_TABLE,
      timestamps: false,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  DEPARTMENT_TABLE,
  DepartmentSchema,
  Department,
};

import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { ModuleType } from "../../app/boss/types/modules.type";

const MODULE_TABLE = "MODULE";

const ModuleSchema: ModelAttributes<Module, ModuleType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_module",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(100),
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT("tiny"),
  },
  createAt: {
    allowNull: false,
    field: "create_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Module extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: MODULE_TABLE,
      modelName: MODULE_TABLE,
      timestamps: false,
    };
  }
}

export default { MODULE_TABLE, ModuleSchema, Module };

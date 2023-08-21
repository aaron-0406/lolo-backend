import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { PermissionType } from "../../app/dash/types/permission.type";

const PERMISSION_TABLE = "PERMISSION";

const PermissionSchema: ModelAttributes<Permission, PermissionType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_permission",
    type: DataTypes.INTEGER,
  },
  name: { type: DataTypes.STRING(150), allowNull: false },
  code: { type: DataTypes.STRING(150), allowNull: false },
  icon: { type: DataTypes.STRING(150), allowNull: false },
  link: { type: DataTypes.STRING(150), allowNull: false, defaultValue: "#" },
};

class Permission extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PERMISSION_TABLE,
      modelName: PERMISSION_TABLE,
      timestamps: false,
    };
  }
}
export default { PERMISSION_TABLE, PermissionSchema, Permission };

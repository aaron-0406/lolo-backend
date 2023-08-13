import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelStatic,
} from "sequelize";

import { RolePermissionType } from "../../../app/boss/types/role-permission.type";
import permissionModel from "../permission.model";
import rolesModel from "../roles.model";

const ROLE_PERMISSION_TABLE = "ROLE_PERMISSION";

const RolePermissionSchema: ModelAttributes<
  RolePermission,
  RolePermissionType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_role_permission",
    type: DataTypes.INTEGER,
  },
  permissionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "permission_id_permission",
    references: {
      model: permissionModel.PERMISSION_TABLE,
      key: "id_permission",
    },
  },
  roleId: {
    allowNull: false,
    field: "role_id_role",
    type: DataTypes.INTEGER,
    references: {
      model: rolesModel.ROLE_TABLE,
      key: "id_role",
    },
  },
};

class RolePermission extends Model {
  static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.belongsTo(models.ROLE, { as: "role" });
    this.belongsTo(models.PERMISSION, { as: "permission" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ROLE_PERMISSION_TABLE,
      modelName: ROLE_PERMISSION_TABLE,
      timestamps: false,
    };
  }
}
export default { ROLE_PERMISSION_TABLE, RolePermissionSchema, RolePermission };

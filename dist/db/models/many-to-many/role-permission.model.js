"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const permission_model_1 = __importDefault(require("../permission.model"));
const roles_model_1 = __importDefault(require("../roles.model"));
const ROLE_PERMISSION_TABLE = "ROLE_PERMISSION";
const RolePermissionSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_role_permission",
        type: sequelize_1.DataTypes.INTEGER,
    },
    permissionId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        field: "permission_id_permission",
        references: {
            model: permission_model_1.default.PERMISSION_TABLE,
            key: "id_permission",
        },
    },
    roleId: {
        allowNull: false,
        field: "role_id_role",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: roles_model_1.default.ROLE_TABLE,
            key: "id_role",
        },
    },
};
class RolePermission extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.ROLE, { as: "role" });
        this.belongsTo(models.PERMISSION, { as: "permission" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ROLE_PERMISSION_TABLE,
            modelName: ROLE_PERMISSION_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { ROLE_PERMISSION_TABLE, RolePermissionSchema, RolePermission };

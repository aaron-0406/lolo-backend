"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const PERMISSION_TABLE = "PERMISSION";
const PermissionSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_permission",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
    code: { type: sequelize_1.DataTypes.STRING(150), unique: true, allowNull: false },
    icon: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
    link: { type: sequelize_1.DataTypes.STRING(150), allowNull: false, defaultValue: "#" },
};
class Permission extends sequelize_1.Model {
    static associate(models) { }
    static config(sequelize) {
        return {
            sequelize,
            tableName: PERMISSION_TABLE,
            modelName: PERMISSION_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { PERMISSION_TABLE, PermissionSchema, Permission };

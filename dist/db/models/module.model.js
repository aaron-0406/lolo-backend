"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const MODULE_TABLE = "MODULE";
const ModuleSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_module",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        field: "name",
        type: sequelize_1.DataTypes.STRING(100),
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT("tiny"),
    },
    state: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT({ length: 1 }),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
};
class Module extends sequelize_1.Model {
    static associate() {
        //associate
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: MODULE_TABLE,
            modelName: MODULE_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { MODULE_TABLE, ModuleSchema, Module };

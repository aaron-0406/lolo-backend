"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DEPARTMENT_TABLE = "DEPARTMENT";
const DepartmentSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        field: "id_department",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        field: "name",
        type: sequelize_1.DataTypes.STRING(150),
    },
    code: {
        allowNull: false,
        field: "code",
        type: sequelize_1.DataTypes.STRING(10),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        field: "updated_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: sequelize_1.DataTypes.DATE,
    }
};
class Department extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.PROVINCE, {
            as: "province",
            foreignKey: "departmentId",
        });
        this.hasMany(models.JUDICIAL_COLLATERAL, {
            as: "judicialCollateral",
            foreignKey: "departmentId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: DEPARTMENT_TABLE,
            modelName: DEPARTMENT_TABLE,
            timestamps: false,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    DEPARTMENT_TABLE,
    DepartmentSchema,
    Department,
};

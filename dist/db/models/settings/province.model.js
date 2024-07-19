"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const department_model_1 = __importDefault(require("./department.model"));
const PROVINCE_TABLE = "PROVINCE";
const { DEPARTMENT_TABLE } = department_model_1.default;
const ProvinceSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_province",
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
    departmentId: {
        allowNull: false,
        field: "department_id_department",
        references: {
            model: DEPARTMENT_TABLE,
            key: "id_department",
        },
        type: sequelize_1.DataTypes.INTEGER,
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
    },
};
class Province extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.DEPARTMENT, { as: "department" });
        this.hasMany(models.DISTRICT, { as: "district", foreignKey: "provinceId" });
        this.hasMany(models.JUDICIAL_COLLATERAL, {
            as: "judicialCollateral",
            foreignKey: "provinceId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: PROVINCE_TABLE,
            modelName: PROVINCE_TABLE,
            timestamps: false,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    PROVINCE_TABLE,
    ProvinceSchema,
    Province,
};

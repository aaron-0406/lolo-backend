"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const province_model_1 = __importDefault(require("./province.model"));
const DISTRICT_TABLE = "DISTRICT";
const { PROVINCE_TABLE } = province_model_1.default;
const DistrictSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_district",
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
    provinceId: {
        allowNull: false,
        field: "province_id_province",
        references: {
            model: PROVINCE_TABLE,
            key: "id_province",
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
class District extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.PROVINCE, { as: "province", foreignKey: "provinceId" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: DISTRICT_TABLE,
            modelName: DISTRICT_TABLE,
            timestamps: false,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    DISTRICT_TABLE,
    DistrictSchema,
    District,
};

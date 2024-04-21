"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("./customer.model"));
const city_model_1 = __importDefault(require("./city.model"));
const EXT_OFFICE_TABLE = "EXT_OFFICE";
const ExtOfficeSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_ext_office",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    cityId: {
        allowNull: false,
        field: "city_id_city",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: city_model_1.default.CITY_TABLE,
            key: "id_city",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerId: {
        allowNull: false,
        field: "customer_id_customer",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_model_1.default.CUSTOMER_TABLE,
            key: "id_customer",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
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
class ExtOffice extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER, { as: "customer" });
        this.belongsTo(models.CITY, { as: "city" });
        this.hasMany(models.EXT_IP_ADDRESS_BANK, {
            as: "extIpAddressBank",
            foreignKey: "officeId",
        });
        this.hasMany(models.CUSTOMER_USER, {
            as: "customerUser",
            foreignKey: "officeId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: EXT_OFFICE_TABLE,
            modelName: EXT_OFFICE_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = { EXT_OFFICE_TABLE, ExtOfficeSchema, ExtOffice };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const GUARANTOR_TABLE = "GUARANTOR";
const GuarantorSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_guarantor",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    phone: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(150),
    },
    email: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(150),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    clientId: {
        allowNull: false,
        field: "client_id_client",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_model_1.default.CLIENT_TABLE,
            key: "id_client",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};
class Guarantor extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CLIENT, { as: "client" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: GUARANTOR_TABLE,
            modelName: GUARANTOR_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { GUARANTOR_TABLE, GuarantorSchema, Guarantor };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const FILE_TABLE = "FILE";
const FileSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_file",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        field: "name",
        type: sequelize_1.DataTypes.STRING(100),
    },
    originalName: {
        allowNull: false,
        field: "originalname",
        type: sequelize_1.DataTypes.STRING(100),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    clientId: {
        allowNull: false,
        field: "id_client",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_model_1.default.CLIENT_TABLE,
            key: "id_client",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class File extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CLIENT, {
            as: "client",
            foreignKey: "clientId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: FILE_TABLE,
            modelName: FILE_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { FILE_TABLE, FileSchema, File };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const ext_tag_model_1 = __importDefault(require("./ext-tag.model"));
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
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    originalName: {
        allowNull: false,
        field: "originalname",
        type: sequelize_1.DataTypes.TEXT("long"),
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
    tagId: {
        allowNull: true,
        field: "tag_id",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ext_tag_model_1.default.EXT_TAG_TABLE,
            key: "id_ext_tag",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
};
class File extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CLIENT, {
            as: "client",
            foreignKey: "clientId",
        });
        this.belongsTo(models.EXT_TAG, {
            as: "classificationTag",
            foreignKey: "tagId",
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

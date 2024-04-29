"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const ext_address_type_model_1 = __importDefault(require("./ext-address-type.model"));
const DIRECTION_TABLE = "DIRECTION";
const DirectionSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_direction",
        type: sequelize_1.DataTypes.INTEGER,
    },
    direction: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
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
        onDelete: "NO ACTION",
    },
    addressTypeId: {
        allowNull: true,
        field: "address_type_id_address_type",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ext_address_type_model_1.default.EXT_ADDRESS_TYPE_TABLE,
            key: "id_address_type",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class Direction extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CLIENT, { as: "client" });
        this.belongsTo(models.EXT_ADDRESS_TYPE, { as: "addressType" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: DIRECTION_TABLE,
            modelName: DIRECTION_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { DIRECTION_TABLE, DirectionSchema, Direction };

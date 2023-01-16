"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const NEGOTIATION_TABLE = "NEGOTIATION";
const NegotiationSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_negotiation",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
};
class Negotiation extends sequelize_1.Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: NEGOTIATION_TABLE,
            modelName: NEGOTIATION_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { NEGOTIATION_TABLE, NegotiationSchema, Negotiation };

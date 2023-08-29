"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const JUDICIAL_PROCEDURAL_WAY_TABLE = "JUDICIAL_PROCEDURAL_WAY";
const JudicialProceduralWaySchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_procedural_way",
        type: sequelize_1.DataTypes.INTEGER,
    },
    proceduralWay: {
        allowNull: false,
        field: "procedural_way",
        type: sequelize_1.DataTypes.STRING(150),
    },
};
class JudicialProceduralWay extends sequelize_1.Model {
    static associate(models) { }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_PROCEDURAL_WAY_TABLE,
            modelName: JUDICIAL_PROCEDURAL_WAY_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { JUDICIAL_PROCEDURAL_WAY_TABLE, JudicialProceduralWaySchema, JudicialProceduralWay };

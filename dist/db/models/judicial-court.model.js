"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const JUDICIAL_COURT_TABLE = "JUDICIAL_COURT";
const JudicialCourtSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_court",
        type: sequelize_1.DataTypes.INTEGER,
    },
    court: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
};
class JudicialCourt extends sequelize_1.Model {
    static associate(models) { }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_COURT_TABLE,
            modelName: JUDICIAL_COURT_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { JUDICIAL_COURT_TABLE, JudicialCourtSchema, JudicialCourt };

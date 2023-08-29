"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const JUDICIAL_SUBJECT_TABLE = "JUDICIAL_SUBJECT";
const JudicialSubjectSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_subject",
        type: sequelize_1.DataTypes.INTEGER,
    },
    subject: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
};
class JudicialSubject extends sequelize_1.Model {
    static associate(models) { }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_SUBJECT_TABLE,
            modelName: JUDICIAL_SUBJECT_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { JUDICIAL_SUBJECT_TABLE, JudicialSubjectSchema, JudicialSubject };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BANK_TABLE = "BANK";
const BankSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_bank",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        field: "name",
        type: sequelize_1.DataTypes.STRING(100),
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT("tiny"),
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
};
class Bank extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.FUNCIONARIO, {
            as: "funcionario",
            foreignKey: "bankId",
        });
        this.hasMany(models.JUDICIAL_CASE_FILE, {
            as: "judicialCaseFile",
            foreignKey: "id_bank",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: BANK_TABLE,
            modelName: BANK_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { BANK_TABLE, BankSchema, Bank };

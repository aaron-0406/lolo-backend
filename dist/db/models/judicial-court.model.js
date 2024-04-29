"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const city_model_1 = __importDefault(require("./city.model"));
const JUDICIAL_COURT_TABLE = "JUDICIAL_COURT";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
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
    customerHasBankId: {
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    cityId: {
        allowNull: true,
        field: "city_id_city",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: city_model_1.default.CITY_TABLE,
            key: "id_city",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class JudicialCourt extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.CITY, { as: "city" });
    }
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const judicial_collateral_charges_encumbrances_type_load_model_1 = __importDefault(require("./judicial-collateral-charges-encumbrances-type-load.model"));
const judicial_collateral_model_1 = __importDefault(require("./judicial-collateral.model"));
const JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE = "JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES";
const { JUDICIAL_COLLATERAL_TABLE } = judicial_collateral_model_1.default;
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE } = judicial_collateral_charges_encumbrances_type_load_model_1.default;
const JudicialCollateralChargesEncumbrancesSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_judicial_collateral_charges_encumbrances",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    judicialCollateralIdJudicialCollateral: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "judicial_collateral_id_judicial_collateral",
        references: {
            model: JUDICIAL_COLLATERAL_TABLE,
            key: "id_judicial_collateral",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    typeOfLoadId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "type_of_load_id",
        references: {
            model: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
            key: "id_judicial_collateral_charges_encumbrances_type_load",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    amountOfImpactSoles: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
        field: "amount_of_impact_soles",
    },
    amountOfImpactDollars: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
        field: "amount_of_impact_dollars",
    },
    descriptionOfLoad: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        field: "description_of_load",
    },
    registrationSeat: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        field: "registration_seat",
    },
    registrationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "registration_date",
    },
    range: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "range",
    },
    appraisalDate: {
        allowNull: true,
        field: "appraisal_date",
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        field: "updated_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: sequelize_1.DataTypes.DATE,
    },
};
class JudicialCollateralChargesEncumbrances extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD, {
            as: "judicialCollateralChargesEncumbrancesTypeLoad",
        });
        this.belongsTo(models.JUDICIAL_COLLATERAL, {
            as: "judicialCollateralChargesEncumbrances",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
            modelName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    JudicialCollateralChargesEncumbrances,
    JudicialCollateralChargesEncumbrancesSchema,
    JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE,
};

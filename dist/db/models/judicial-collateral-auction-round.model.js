"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const judicial_collateral_model_1 = __importDefault(require("./judicial-collateral.model"));
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE = "JUDICIAL_COLLATERAL_AUCTION_ROUND";
const { JUDICIAL_COLLATERAL_TABLE } = judicial_collateral_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialCollateralAuctionRoundSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id_judicial_collateral_auction_round",
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
    customerHasBankId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        references: {
            model: CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    appraisalDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: "appraisal_date",
    },
    expertReportDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: "expert_report_date",
    },
    encumbranceAmountSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "encumbrance_amount_soles",
    },
    encumbranceAmountDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "encumbrance_amount_dollars",
    },
    conventionalValueSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "conventional_value_soles",
    },
    conventionalValueDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "conventional_value_dollars",
    },
    marketValueSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "market_value_soles",
    },
    marketValueDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "market_value_dollars",
    },
    realizationValueSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "realization_value_soles",
    },
    realizationValueDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "realization_value_dollars",
    },
    auctionValueSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "auction_value_soles",
    },
    auctionValueDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "auction_value_dollars",
    },
    auctionRound: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "auction_round",
    },
    firstCallSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "first_call_soles",
    },
    firstCallDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "first_call_dollars",
    },
    secondCallSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "second_call_soles",
    },
    secondCallDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "second_call_dollars",
    },
    thirdCallSoles: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "third_call_soles",
    },
    thirdCallDollars: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "third_call_dollars",
    },
    appraisalExperts: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        field: "appraisal_experts",
    },
    auctionType: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        field: "auction_type",
    },
    auctionerName: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        field: "auctioner_name",
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
class JudicialCollateralAuctionRound extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JUDICIAL_COLLATERAL, { as: "judicialCollateral" });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
            modelName: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
    JudicialCollateralAuctionRoundSchema,
    JudicialCollateralAuctionRound,
};

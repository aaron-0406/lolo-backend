"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const judicial_binnacle_model_1 = __importDefault(require("../models/judicial-binnacle.model"));
("../models/judicial-binnacle.model");
const judicial_bin_defendant_procedural_action_model_1 = __importDefault(require("../models/judicial-bin-defendant-procedural-action.model"));
("../models/judicial-bin-procedural-stage.model");
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const { JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE } = judicial_bin_defendant_procedural_action_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_defendant_procedural_action",
                type: sequelize_1.DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            defendantProceduralAction: {
                allowNull: false,
                field: "defendant_procedural_action",
                type: sequelize_1.DataTypes.STRING(150),
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "updated_at",
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            deletedAt: {
                allowNull: true,
                type: sequelize_1.DataTypes.DATE,
                field: "deleted_at",
            },
            customerHasBankId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: "customer_has_bank_id_customer_has_bank",
                references: {
                    model: CUSTOMER_HAS_BANK_TABLE,
                    key: "id_customer_has_bank",
                },
            },
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, "defendant_procedural_action_id", {
            allowNull: true,
            field: "defendant_procedural_action_id",
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
                key: "id_defendant_procedural_action",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, "defendant_procedural_action_id");
        yield queryInterface.dropTable(JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE);
    });
}
exports.down = down;

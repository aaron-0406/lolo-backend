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
const judicial_bin_type_binnacle_model_1 = __importDefault(require("../models/judicial-bin-type-binnacle.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const judicial_bin_procedural_stage_model_1 = __importDefault(require("../models/judicial-bin-procedural-stage.model"));
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicial_bin_type_binnacle_model_1.default;
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicial_bin_procedural_stage_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerHasBanIds = yield queryInterface.sequelize.query(`SELECT id_customer_has_bank FROM ${CUSTOMER_HAS_BANK_TABLE} WHERE id_customer_has_bank IS NOT NULL`, { type: sequelize_1.QueryTypes.SELECT });
            for (const customerHasBank of customerHasBanIds) {
                const customerHasBankId = customerHasBank.id_customer_has_bank;
                const typeBinnacles = yield queryInterface.sequelize.query(`SELECT type_binnacle FROM ${JUDICIAL_BIN_TYPE_BINNACLE_TABLE} WHERE customer_has_bank_id_customer_has_bank = :customerHasBankId`, {
                    type: sequelize_1.QueryTypes.SELECT,
                    replacements: { customerHasBankId }
                });
                const hasResolutionType = typeBinnacles.some((binnacle) => binnacle.type_binnacle === "RESOLUCION");
                const hasEscritoType = typeBinnacles.some((binnacle) => binnacle.type_binnacle === "ESCRITO");
                if (!hasResolutionType) {
                    yield queryInterface.sequelize.query(`INSERT INTO ${JUDICIAL_BIN_TYPE_BINNACLE_TABLE} (customer_has_bank_id_customer_has_bank, type_binnacle, created_at, updated_at) VALUES (:customerHasBankId, "RESOLUCION", NOW(), NOW())`, { replacements: { customerHasBankId } });
                }
                if (!hasEscritoType) {
                    yield queryInterface.sequelize.query(`INSERT INTO ${JUDICIAL_BIN_TYPE_BINNACLE_TABLE} (customer_has_bank_id_customer_has_bank, type_binnacle, created_at, updated_at) VALUES (:customerHasBankId, "ESCRITO", NOW(), NOW())`, { replacements: { customerHasBankId } });
                }
            }
        }
        catch (error) {
            console.error("Error during bulk insert:", error);
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield queryInterface.sequelize.query(`ALTER TABLE ${JUDICIAL_BINNACLE_TABLE} DROP COLUMN judicial_bin_procedural_stage_id_judicial_bin_procedural_stage`);
        }
        catch (error) {
            console.error("Error during bulk insert:", error);
        }
    });
}
exports.down = down;

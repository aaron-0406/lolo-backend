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
const judicial_case_file_model_1 = __importDefault(require("../models/judicial-case-file.model"));
const sequelize_1 = require("sequelize");
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_soles", {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true,
        });
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_dollars", {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true,
        });
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_soles", {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true,
        });
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_dollars", {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true,
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_soles");
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_dollars");
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_soles");
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_dollars");
    });
}
exports.down = down;

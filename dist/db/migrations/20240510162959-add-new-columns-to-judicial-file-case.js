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
const judicial_case_file_model_1 = __importDefault(require("../models/judicial-case-file.model"));
const judicial_process_reason_model_1 = __importDefault(require("../models/judicial-process-reason.model"));
const { JUDICIAL_PROCESS_REASON_TABLE } = judicial_process_reason_model_1.default;
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "process_reason_id", {
            allowNull: true,
            field: "process_reason_id",
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: JUDICIAL_PROCESS_REASON_TABLE,
                key: "id_judicial_process_status_reason",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "process_status", {
            allowNull: true,
            field: "process_status",
            type: sequelize_1.DataTypes.STRING(150),
        });
        yield queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "process_comment", {
            allowNull: true,
            field: "process_comment",
            type: sequelize_1.DataTypes.TEXT("long"),
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "process_reason_id");
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "process_status");
        yield queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "process_comment");
    });
}
exports.down = down;

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
const judicial_obs_file_model_1 = __importDefault(require("../models/judicial-obs-file.model"));
const judicial_observation_model_1 = __importDefault(require("../models/judicial-observation.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { JUDICIAL_OBS_FILE_TABLE } = judicial_obs_file_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { JUDICIAL_OBSERVATION_TABLE } = judicial_observation_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_OBS_FILE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_obs_file",
                type: sequelize_1.DataTypes.INTEGER,
            },
            awsName: {
                allowNull: false,
                field: "aws_name",
                type: sequelize_1.DataTypes.TEXT("long"),
            },
            originalName: {
                allowNull: false,
                field: "original_name",
                type: sequelize_1.DataTypes.TEXT("long"),
            },
            judicialObservationId: {
                allowNull: false,
                field: "judicial_observation_id_judicial_observation",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_OBSERVATION_TABLE,
                    key: "id_judicial_observation",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
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
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(JUDICIAL_OBS_FILE_TABLE);
    });
}
exports.down = down;

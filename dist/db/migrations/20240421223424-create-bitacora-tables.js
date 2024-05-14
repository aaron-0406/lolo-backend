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
const judicial_bin_procedural_stage_model_1 = __importDefault(require("../models/judicial-bin-procedural-stage.model"));
("../models/judicial-bin-procedural-stage.model");
const judicial_bin_type_binnacle_model_1 = __importDefault(require("../models/judicial-bin-type-binnacle.model"));
const judicial_bin_file_model_1 = __importDefault(require("../models/judicial-bin-file.model"));
const judicial_case_file_model_1 = __importDefault(require("../models/judicial-case-file.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicial_bin_procedural_stage_model_1.default;
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicial_bin_type_binnacle_model_1.default;
const { JUDICIAL_BIN_FILE } = judicial_bin_file_model_1.default;
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_BIN_TYPE_BINNACLE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_bin_type_binnacle",
                type: sequelize_1.DataTypes.INTEGER,
            },
            typeBinnacle: {
                allowNull: false,
                field: "type_binnacle",
                type: sequelize_1.DataTypes.STRING(150),
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
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
        yield queryInterface.createTable(JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_bin_procedural_stage",
                type: sequelize_1.DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            proceduralStage: {
                allowNull: false,
                field: "procedural_stage",
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
        yield queryInterface.createTable(JUDICIAL_BINNACLE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_binnacle",
                type: sequelize_1.DataTypes.INTEGER,
            },
            binnacleTypeId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: "type_binnacle_id_type_binnacle",
                references: {
                    model: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
                    key: "id_judicial_bin_type_binnacle",
                },
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
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
            date: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "date",
            },
            judicialBinProceduralStageId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
                    key: "id_judicial_bin_procedural_stage",
                },
                field: "judicial_bin_procedural_stage_id_judicial_bin_procedural_stage",
            },
            judicialFileCaseId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: "judicial_file_case_id_judicial_file_case",
                references: {
                    model: JUDICIAL_CASE_FILE_TABLE,
                    key: "id_judicial_case_file",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            lastPerformed: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
                field: "last_performed",
            },
        });
        yield queryInterface.createTable(JUDICIAL_BIN_FILE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_bin_file",
                type: sequelize_1.DataTypes.INTEGER,
            },
            judicialBinnacleId: {
                allowNull: false,
                field: "judicial_binnacle_id_judicial_binnacle",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_BINNACLE_TABLE,
                    key: "id_judicial_binnacle",
                },
            },
            nameOriginAws: {
                allowNull: false,
                field: "name_origin_aws",
                type: sequelize_1.DataTypes.STRING,
            },
            originalName: {
                allowNull: false,
                field: "original_name",
                type: sequelize_1.DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
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
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(JUDICIAL_BIN_FILE);
        yield queryInterface.dropTable(JUDICIAL_BINNACLE_TABLE);
        yield queryInterface.dropTable(JUDICIAL_BIN_TYPE_BINNACLE_TABLE);
        yield queryInterface.dropTable(JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE);
    });
}
exports.down = down;

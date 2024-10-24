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
const judicial_subject_model_1 = __importDefault(require("../models/judicial-subject.model"));
const judicial_court_model_1 = __importDefault(require("../models/judicial-court.model"));
const judicial_procedural_way_model_1 = __importDefault(require("../models/judicial-procedural-way.model"));
const client_model_1 = __importDefault(require("../models/client.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
const { CLIENT_TABLE } = client_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const { JUDICIAL_SUBJECT_TABLE } = judicial_subject_model_1.default;
const { JUDICIAL_COURT_TABLE } = judicial_court_model_1.default;
const { JUDICIAL_PROCEDURAL_WAY_TABLE } = judicial_procedural_way_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_SUBJECT_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_subject",
                type: sequelize_1.DataTypes.INTEGER,
            },
            subject: {
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
        });
        yield queryInterface.createTable(JUDICIAL_COURT_TABLE, {
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
        });
        yield queryInterface.createTable(JUDICIAL_PROCEDURAL_WAY_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_procedural_way",
                type: sequelize_1.DataTypes.INTEGER,
            },
            proceduralWay: {
                allowNull: false,
                field: "procedural_way",
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
        });
        yield queryInterface.createTable(JUDICIAL_CASE_FILE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_case_file",
                type: sequelize_1.DataTypes.INTEGER,
            },
            numberCaseFile: {
                allowNull: false,
                field: "number_case_file",
                type: sequelize_1.DataTypes.STRING(150),
            },
            judgmentNumber: {
                allowNull: true,
                field: "judgment_number",
                type: sequelize_1.DataTypes.INTEGER,
            },
            secretary: {
                allowNull: true,
                type: sequelize_1.DataTypes.STRING(150),
            },
            amountDemandedSoles: {
                allowNull: true,
                field: "amount_demanded_soles",
                type: sequelize_1.DataTypes.DECIMAL(10, 3),
            },
            amountDemandedDollars: {
                allowNull: true,
                field: "amount_demanded_dollars",
                type: sequelize_1.DataTypes.DECIMAL(10, 3),
            },
            cautionaryCode: {
                allowNull: true,
                field: "cautionary_code",
                type: sequelize_1.DataTypes.STRING(150),
            },
            errandCode: {
                allowNull: true,
                field: "errand_code",
                type: sequelize_1.DataTypes.STRING(150),
            },
            judicialVenue: {
                field: "judicial_venue",
                allowNull: true,
                type: sequelize_1.DataTypes.STRING(150),
            },
            judge: {
                allowNull: true,
                type: sequelize_1.DataTypes.STRING(150),
            },
            demandDate: {
                field: "demand_date",
                allowNull: true,
                type: sequelize_1.DataTypes.DATE,
            },
            createdAt: {
                allowNull: false,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            clientId: {
                allowNull: false,
                field: "client_id_client",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: CLIENT_TABLE,
                    key: "id_client",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            customerUserId: {
                allowNull: false,
                field: "customer_user_id_customer_user",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: CUSTOMER_USER_TABLE,
                    key: "id_customer_user",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            judicialCourtId: {
                allowNull: false,
                field: "judicial_court_id_judicial_court",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: judicial_court_model_1.default.JUDICIAL_COURT_TABLE,
                    key: "id_judicial_court",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            judicialSubjectId: {
                allowNull: false,
                field: "judicial_subject_id_judicial_subject",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: judicial_subject_model_1.default.JUDICIAL_SUBJECT_TABLE,
                    key: "id_judicial_subject",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            judicialProceduralWayId: {
                allowNull: false,
                field: "judicial_procedural_way_id_judicial_procedural_way",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: judicial_procedural_way_model_1.default.JUDICIAL_PROCEDURAL_WAY_TABLE,
                    key: "id_judicial_procedural_way",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(JUDICIAL_SUBJECT_TABLE);
        yield queryInterface.dropTable(JUDICIAL_PROCEDURAL_WAY_TABLE);
        yield queryInterface.dropTable(JUDICIAL_COURT_TABLE);
        yield queryInterface.dropTable(JUDICIAL_CASE_FILE_TABLE);
    });
}
exports.down = down;

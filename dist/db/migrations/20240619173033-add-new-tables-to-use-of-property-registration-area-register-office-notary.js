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
const judicial_notary_model_1 = __importDefault(require("../models/judicial-notary.model"));
const judicial_register_office_model_1 = __importDefault(require("../models/judicial-register-office.model"));
const judicial_registration_area_model_1 = __importDefault(require("../models/judicial-registration-area.model"));
const judicial_use_of_property_model_1 = __importDefault(require("../models/judicial-use-of-property.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { JUDICIAL_NOTARY_TABLE } = judicial_notary_model_1.default;
const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicial_register_office_model_1.default;
const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicial_registration_area_model_1.default;
const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicial_use_of_property_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_NOTARY_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_notary",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
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
        yield queryInterface.createTable(JUDICIAL_REGISTER_OFFICE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_register_office",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
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
        yield queryInterface.createTable(JUDICIAL_REGISTRATION_AREA_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_registration_area",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
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
        yield queryInterface.createTable(JUDICIAL_USE_OF_PROPERTY_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_use_of_property",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
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
        yield queryInterface.dropTable(JUDICIAL_NOTARY_TABLE);
        yield queryInterface.dropTable(JUDICIAL_REGISTER_OFFICE_TABLE);
        yield queryInterface.dropTable(JUDICIAL_REGISTRATION_AREA_TABLE);
        yield queryInterface.dropTable(JUDICIAL_USE_OF_PROPERTY_TABLE);
    });
}
exports.down = down;

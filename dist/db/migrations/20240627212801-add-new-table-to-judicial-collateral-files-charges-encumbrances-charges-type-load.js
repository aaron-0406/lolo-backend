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
const judicial_collateral_charges_encumbrances_type_load_model_1 = __importDefault(require("../models/judicial-collateral-charges-encumbrances-type-load.model"));
const judicial_collateral_charges_encumbrances_model_1 = __importDefault(require("../models/judicial-collateral-charges-encumbrances.model"));
const judicial_collateral_files_model_1 = __importDefault(require("../models/judicial-collateral-files.model"));
const judicial_collateral_model_1 = __importDefault(require("../models/judicial-collateral.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE } = judicial_collateral_charges_encumbrances_type_load_model_1.default;
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE } = judicial_collateral_charges_encumbrances_model_1.default;
const { JUDICIAL_COLLATERAL_FILES_TABLE } = judicial_collateral_files_model_1.default;
const { JUDICIAL_COLLATERAL_TABLE } = judicial_collateral_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_COLLATERAL_FILES_TABLE, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: "id_judicial_collateral_files",
            },
            nameOriginAws: {
                type: sequelize_1.DataTypes.TEXT("long"),
                allowNull: false,
                field: "name_origin_aws",
            },
            originalName: {
                type: sequelize_1.DataTypes.TEXT("long"),
                allowNull: false,
                field: "original_name",
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
        yield queryInterface.createTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                field: "id_type_of_load",
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: false,
                field: "name",
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
        yield queryInterface.createTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE, {
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
                    key: "id_type_of_load",
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
        yield queryInterface.dropTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE);
        yield queryInterface.dropTable(JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TABLE);
        yield queryInterface.dropTable(JUDICIAL_COLLATERAL_FILES_TABLE);
    });
}
exports.down = down;

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
const judicial_collateral_model_1 = __importDefault(require("../models/judicial-collateral.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const department_model_1 = __importDefault(require("../models/settings/department.model"));
const district_model_1 = __importDefault(require("../models/settings/district.model"));
const province_model_1 = __importDefault(require("../models/settings/province.model"));
const judicial_notary_model_1 = __importDefault(require("../models/judicial-notary.model"));
const judicial_register_office_model_1 = __importDefault(require("../models/judicial-register-office.model"));
const judicial_registration_area_model_1 = __importDefault(require("../models/judicial-registration-area.model"));
const judicial_use_of_property_model_1 = __importDefault(require("../models/judicial-use-of-property.model"));
const { JUDICIAL_COLLATERAL_TABLE } = judicial_collateral_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { DEPARTMENT_TABLE } = department_model_1.default;
const { DISTRICT_TABLE } = district_model_1.default;
const { PROVINCE_TABLE } = province_model_1.default;
const { JUDICIAL_NOTARY_TABLE } = judicial_notary_model_1.default;
const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicial_register_office_model_1.default;
const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicial_registration_area_model_1.default;
const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicial_use_of_property_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(JUDICIAL_COLLATERAL_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_judicial_collateral",
                type: sequelize_1.DataTypes.INTEGER,
            },
            kindOfProperty: {
                allowNull: false,
                field: "kind_of_property",
                type: sequelize_1.DataTypes.STRING,
            },
            propertyAddress: {
                allowNull: false,
                field: "property_address",
                type: sequelize_1.DataTypes.TEXT("long"),
            },
            propertyFeatures: {
                allowNull: false,
                field: "property_features",
                type: sequelize_1.DataTypes.TEXT("long"),
            },
            landArea: {
                allowNull: false,
                field: "land_area",
                type: sequelize_1.DataTypes.TEXT("long"),
            },
            constructionArea: {
                allowNull: false,
                field: "construction_area",
                type: sequelize_1.DataTypes.TEXT("long"),
            },
            electronicRecord: {
                allowNull: false,
                field: "electronic_record",
                type: sequelize_1.DataTypes.STRING,
            },
            dateOfPublicDeed: {
                allowNull: false,
                field: "date_of_public_deed",
                type: sequelize_1.DataTypes.DATE,
            },
            numberOfCollateral: {
                allowNull: false,
                field: "number_of_collateral",
                type: sequelize_1.DataTypes.INTEGER,
            },
            registrationSeat: {
                allowNull: false,
                field: "registration_seat",
                type: sequelize_1.DataTypes.STRING,
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
            departmentId: {
                allowNull: false,
                field: "department_id",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: DEPARTMENT_TABLE,
                    key: "id_department",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            provinceId: {
                allowNull: false,
                field: "province_id",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: PROVINCE_TABLE,
                    key: "id_province",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            districtId: {
                allowNull: false,
                field: "district_id",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: DISTRICT_TABLE,
                    key: "id_district",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            useOfPropertyId: {
                allowNull: false,
                field: "use_of_property_id",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_USE_OF_PROPERTY_TABLE,
                    key: "id_judicial_use_of_property",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            registrationAreaId: {
                allowNull: false,
                field: "registration_area_id",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_REGISTRATION_AREA_TABLE,
                    key: "id_judicial_registration_area",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            registerOfficeId: {
                allowNull: false,
                field: "register_office",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_REGISTER_OFFICE_TABLE,
                    key: "id_judicial_register_office",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            notaryId: {
                allowNull: false,
                field: "notary_id",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: JUDICIAL_NOTARY_TABLE,
                    key: "id_judicial_notary",
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
        yield queryInterface.dropTable(JUDICIAL_COLLATERAL_TABLE);
    });
}
exports.down = down;

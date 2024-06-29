"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const judicial_use_of_property_model_1 = __importDefault(require("./judicial-use-of-property.model"));
const department_model_1 = __importDefault(require("./settings/department.model"));
const province_model_1 = __importDefault(require("./settings/province.model"));
const district_model_1 = __importDefault(require("./settings/district.model"));
const judicial_registration_area_model_1 = __importDefault(require("./judicial-registration-area.model"));
const judicial_register_office_model_1 = __importDefault(require("./judicial-register-office.model"));
const judicial_notary_model_1 = __importDefault(require("./judicial-notary.model"));
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicial_use_of_property_model_1.default;
const { DEPARTMENT_TABLE } = department_model_1.default;
const { PROVINCE_TABLE } = province_model_1.default;
const { DISTRICT_TABLE } = district_model_1.default;
const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicial_registration_area_model_1.default;
const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicial_register_office_model_1.default;
const { JUDICIAL_NOTARY_TABLE } = judicial_notary_model_1.default;
const JUDICIAL_COLLATERAL_TABLE = "JUDICIAL_COLLATERAL";
const JudicialCollateralSchema = {
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
        type: sequelize_1.DataTypes.STRING(150),
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
        type: sequelize_1.DataTypes.STRING(150),
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
};
class JudicialCollateral extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.JUDICIAL_USE_OF_PROPERTY, { as: "useOfProperty" });
        this.belongsTo(models.DEPARTMENT, { as: "department" });
        this.belongsTo(models.PROVINCE, { as: "province" });
        this.belongsTo(models.DISTRICT, { as: "district" });
        this.belongsTo(models.JUDICIAL_REGISTRATION_AREA, {
            as: "registrationArea",
        });
        this.belongsTo(models.JUDICIAL_REGISTER_OFFICE, { as: "registerOffice" });
        this.belongsTo(models.JUDICIAL_NOTARY, { as: "notary" });
        this.hasMany(models.JUDICIAL_CASE_FILE_HAS_COLLATERAL, {
            as: "judicialCaseFileHasCollateral",
            foreignKey: "judicialCollateralId",
        });
        this.hasMany(models.JUDICIAL_COLLATERAL_FILES, {
            as: "judicialCollateralFiles",
            foreignKey: "judicialCollateralIdJudicialCollateral",
        });
        this.hasMany(models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES, {
            as: "judicialCollateralChargesEncumbrances",
            foreignKey: "judicialCollateralIdJudicialCollateral",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_COLLATERAL_TABLE,
            modelName: JUDICIAL_COLLATERAL_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_COLLATERAL_TABLE,
    JudicialCollateralSchema,
    JudicialCollateral,
};

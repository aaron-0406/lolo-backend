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
const ext_office_model_1 = __importDefault(require("../models/ext-office.model"));
const city_model_1 = __importDefault(require("../models/city.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const ext_ip_address_bank_model_1 = __importDefault(require("../models/ext-ip-address-bank.model"));
const { EXT_OFFICE_TABLE } = ext_office_model_1.default;
const newOffice = [
    {
        id_ext_office: 1,
        name: "oficina en espera",
        address: "sin calle",
        city_id_city: 1,
        customer_id_customer: 1,
        state: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(EXT_OFFICE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_ext_office",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
            },
            address: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
            },
            cityId: {
                allowNull: false,
                field: "city_id_city",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: city_model_1.default.CITY_TABLE,
                    key: "id_city",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            customerId: {
                allowNull: false,
                field: "customer_id_customer",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: customer_model_1.default.CUSTOMER_TABLE,
                    key: "id_customer",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            state: {
                allowNull: false,
                type: sequelize_1.DataTypes.TINYINT({ length: 1 }),
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
        yield queryInterface.bulkInsert(EXT_OFFICE_TABLE, newOffice);
        yield queryInterface.addConstraint(EXT_OFFICE_TABLE, {
            fields: ["city_id_city"],
            type: "foreign key",
            name: "fk_ext_office_city",
            references: {
                table: city_model_1.default.CITY_TABLE,
                field: "id_city",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addConstraint(EXT_OFFICE_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "fk_ext_office_customer",
            references: {
                table: customer_model_1.default.CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addColumn(customer_user_model_1.default.CUSTOMER_USER_TABLE, "ext_office_id_ext_office", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        });
        yield queryInterface.addColumn(ext_ip_address_bank_model_1.default.EXT_IP_ADDRESS_BANK_TABLE, "ext_office_id_ext_office", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        });
        yield queryInterface.addConstraint(customer_user_model_1.default.CUSTOMER_USER_TABLE, {
            fields: ["ext_office_id_ext_office"],
            type: "foreign key",
            name: "fk_customer_user_ext_office",
            references: {
                table: EXT_OFFICE_TABLE,
                field: "id_ext_office",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addConstraint(ext_ip_address_bank_model_1.default.EXT_IP_ADDRESS_BANK_TABLE, {
            fields: ["ext_office_id_ext_office"],
            type: "foreign key",
            name: "fk_ext_ip_address_bank_ext_office",
            references: {
                table: EXT_OFFICE_TABLE,
                field: "id_ext_office",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(EXT_OFFICE_TABLE, "fk_ext_office_city");
        yield queryInterface.removeConstraint(EXT_OFFICE_TABLE, "fk_ext_office_customer");
        // await queryInterface.removeConstraint(
        //   extIpAddressBankModel.EXT_IP_ADDRESS_BANK_TABLE,
        //   "fk_ext_ip_address_bank_ext_office"
        // );
        yield queryInterface.removeConstraint(customer_user_model_1.default.CUSTOMER_USER_TABLE, "fk_customer_user_ext_office");
        // await queryInterface.removeColumn(
        //   extIpAddressBankModel.EXT_IP_ADDRESS_BANK_TABLE,
        //   "ext_office_id_ext_office"
        // );
        yield queryInterface.removeColumn(customer_user_model_1.default.CUSTOMER_USER_TABLE, "ext_office_id_ext_office");
        yield queryInterface.dropTable(EXT_OFFICE_TABLE);
    });
}
exports.down = down;

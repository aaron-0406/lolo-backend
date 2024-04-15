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
const ext_contact_type_model_1 = __importDefault(require("../models/ext-contact-type.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { EXT_CONTACT_TYPE_TABLE } = ext_contact_type_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const newContactType = [
    {
        id_ext_contact_type: 1,
        contactType: "Fiador",
        customer_has_bank_id_customer_has_bank: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(EXT_CONTACT_TYPE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_ext_contact_type",
                type: sequelize_1.DataTypes.INTEGER,
            },
            contactType: {
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
        yield queryInterface.bulkInsert(EXT_CONTACT_TYPE_TABLE, newContactType);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(EXT_CONTACT_TYPE_TABLE);
    });
}
exports.down = down;
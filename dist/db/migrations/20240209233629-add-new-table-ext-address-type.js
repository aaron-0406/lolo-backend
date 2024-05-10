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
const ext_address_type_model_1 = __importDefault(require("../models/ext-address-type.model"));
const direction_model_1 = __importDefault(require("../models/direction.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { EXT_ADDRESS_TYPE_TABLE } = ext_address_type_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { DIRECTION_TABLE } = direction_model_1.default;
const newAddresses = [
    {
        id_address_type: 1,
        address_type: "GARANTIA",
        customer_has_bank_id_customer_has_bank: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
    {
        id_address_type: 2,
        address_type: "DOMICILIARIA",
        customer_has_bank_id_customer_has_bank: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(EXT_ADDRESS_TYPE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_address_type",
                type: sequelize_1.DataTypes.INTEGER,
            },
            type: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(200),
                field: "address_type",
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
        yield queryInterface.bulkInsert(EXT_ADDRESS_TYPE_TABLE, newAddresses);
        const updateMappings = [
            { oldValue: "DIR GARANTIA", newValue: 1 },
            { oldValue: "DIR DOMICILIARIA", newValue: 2 },
        ];
        for (const mapping of updateMappings) {
            yield queryInterface.sequelize.query(`UPDATE ${DIRECTION_TABLE} SET type = '${mapping.newValue}' WHERE type = '${mapping.oldValue}'`);
        }
        yield queryInterface.sequelize.query(`
  ALTER TABLE ${DIRECTION_TABLE}
  CHANGE COLUMN type address_type_id_address_type INT NOT NULL
  `);
        yield queryInterface.sequelize.query(`ALTER TABLE DIRECTION MODIFY COLUMN address_type_id_address_type INT AFTER client_id_client`);
        yield queryInterface.addConstraint(DIRECTION_TABLE, {
            fields: ["address_type_id_address_type"],
            type: "foreign key",
            name: "fk_direction_address_type",
            references: {
                table: EXT_ADDRESS_TYPE_TABLE,
                field: "id_address_type",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(EXT_ADDRESS_TYPE_TABLE);
        yield queryInterface.sequelize.query(`
  ALTER TABLE ${DIRECTION_TABLE}
  CHANGE COLUMN address_type_id_address_type type VARCHAR(200) NOT NULL
  `);
        const updateMappings = [
            { oldValue: "1", newValue: "DIR GARANTIA" },
            { oldValue: "2", newValue: "DIR DOMICILIARIA" },
        ];
        for (const mapping of updateMappings) {
            yield queryInterface.sequelize.query(`UPDATE ${DIRECTION_TABLE} SET type = '${mapping.newValue}' WHERE type = '${mapping.oldValue}'`);
        }
        yield queryInterface.removeConstraint(DIRECTION_TABLE, "fk_direction_address_type");
    });
}
exports.down = down;

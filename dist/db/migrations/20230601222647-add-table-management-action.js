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
const management_action_model_1 = __importDefault(require("../models/management-action.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { MANAGEMENT_ACTION_TABLE } = management_action_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { COMMENT_TABLE } = comment_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(MANAGEMENT_ACTION_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_management_action",
                type: sequelize_1.DataTypes.INTEGER,
            },
            codeAction: {
                allowNull: false,
                field: "code_action",
                type: sequelize_1.DataTypes.STRING(10),
            },
            nameAction: {
                allowNull: false,
                field: "name_action",
                type: sequelize_1.DataTypes.STRING(150),
            },
            codeSubTypeManagement: {
                allowNull: false,
                field: "code_sub_type_management",
                type: sequelize_1.DataTypes.STRING(10),
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
        yield queryInterface.addConstraint(MANAGEMENT_ACTION_TABLE, {
            fields: ["customer_has_bank_id_customer_has_bank"],
            type: "foreign key",
            name: "fk_management_action_customer_has_bank",
            references: {
                table: CUSTOMER_HAS_BANK_TABLE,
                field: "id_customer_has_bank",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addColumn(COMMENT_TABLE, "management_action_id_management_action", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        });
        yield queryInterface.sequelize.query(`ALTER TABLE COMMENT MODIFY COLUMN management_action_id_management_action INT AFTER negotiation`);
        yield queryInterface.addConstraint(COMMENT_TABLE, {
            fields: ["management_action_id_management_action"],
            type: "foreign key",
            name: "fk_comment_management_action",
            references: {
                table: MANAGEMENT_ACTION_TABLE,
                field: "id_management_action",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(MANAGEMENT_ACTION_TABLE, "fk_management_action_customer_has_bank");
        yield queryInterface.dropTable(MANAGEMENT_ACTION_TABLE);
        yield queryInterface.removeConstraint(COMMENT_TABLE, "fk_comment_management_action");
        yield queryInterface.removeColumn(COMMENT_TABLE, "management_action_id_management_action");
    });
}
exports.down = down;

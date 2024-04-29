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
const product_model_1 = __importDefault(require("../models/product.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const { PRODUCT_TABLE } = product_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(PRODUCT_TABLE, "customer_has_bank_id_customer_has_bank", {
            allowNull: true,
            field: "customer_has_bank_id_customer_has_bank",
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: CUSTOMER_HAS_BANK_TABLE,
                key: "id_customer_has_bank",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.sequelize.query(`UPDATE PRODUCT p INNER JOIN CLIENT c ON c.id_client = p.client_id set p.customer_has_bank_id_customer_has_bank = c.customer_has_bank_id_customer_has_bank;
    `);
        yield queryInterface.changeColumn(PRODUCT_TABLE, "customer_has_bank_id_customer_has_bank", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(PRODUCT_TABLE, "customer_has_bank_id_customer_has_bank");
    });
}
exports.down = down;

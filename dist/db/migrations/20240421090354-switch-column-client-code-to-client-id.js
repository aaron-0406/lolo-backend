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
const client_model_1 = __importDefault(require("../models/client.model"));
const { PRODUCT_TABLE } = product_model_1.default;
const { CLIENT_TABLE } = client_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(PRODUCT_TABLE, "client_id", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        });
        yield queryInterface.sequelize.query(`UPDATE PRODUCT p INNER JOIN CLIENT c ON c.code = p.client_code_client set p.client_id = c.id_client;
    `);
        yield queryInterface.addConstraint(PRODUCT_TABLE, {
            fields: ["client_id"],
            type: "foreign key",
            name: "client_id",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(PRODUCT_TABLE, "PRODUCT_ibfk_1");
        yield queryInterface.removeColumn(PRODUCT_TABLE, "client_code_client");
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(PRODUCT_TABLE, "client_id");
        yield queryInterface.removeConstraint(PRODUCT_TABLE, "client_id");
    });
}
exports.down = down;

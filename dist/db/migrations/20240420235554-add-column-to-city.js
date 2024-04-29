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
const city_model_1 = __importDefault(require("../models/city.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const { CITY_TABLE } = city_model_1.default;
const { CUSTOMER_TABLE } = customer_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(CITY_TABLE, "customer_id_customer", {
            allowNull: false,
            defaultValue: 21,
            field: "customer_id_customer",
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: CUSTOMER_TABLE,
                key: "id_customer",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        for (let i = 1; i <= 2; i++) {
            yield queryInterface.bulkUpdate(CITY_TABLE, { customer_id_customer: 1 }, {
                id_city: i,
            });
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(CITY_TABLE, "customer_id_customer");
    });
}
exports.down = down;

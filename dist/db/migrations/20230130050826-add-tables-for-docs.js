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
const direction_model_1 = __importDefault(require("../models/direction.model"));
const template_model_1 = __importDefault(require("../models/template.model"));
const ecampo_model_1 = __importDefault(require("../models/ecampo.model"));
const template_has_values_model_1 = __importDefault(require("../models/many-to-many/template-has-values.model"));
const values_model_1 = __importDefault(require("../models/values.model"));
const { DIRECTION_TABLE } = direction_model_1.default;
const { TemplateSchema, TEMPLATE_TABLE } = template_model_1.default;
const { ECampoSchema, ECAMPO_TABLE } = ecampo_model_1.default;
const { TemplateHasValuesSchema, TEMPLATE_HAS_VALUES_TABLE } = template_has_values_model_1.default;
const { ValuesSchema, VALUES_TABLE } = values_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(DIRECTION_TABLE, "type", {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(200),
        });
        yield queryInterface.createTable(TEMPLATE_TABLE, TemplateSchema);
        yield queryInterface.createTable(ECAMPO_TABLE, ECampoSchema);
        yield queryInterface.createTable(TEMPLATE_HAS_VALUES_TABLE, TemplateHasValuesSchema);
        yield queryInterface.createTable(VALUES_TABLE, ValuesSchema);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(DIRECTION_TABLE, "type");
        yield queryInterface.dropTable(TEMPLATE_HAS_VALUES_TABLE);
        yield queryInterface.dropTable(TEMPLATE_TABLE);
        yield queryInterface.dropTable(ECAMPO_TABLE);
        yield queryInterface.dropTable(VALUES_TABLE);
    });
}
exports.down = down;

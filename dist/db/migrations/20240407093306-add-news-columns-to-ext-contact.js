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
const ext_contacts_model_1 = __importDefault(require("../models/ext-contacts.model"));
const ext_contact_type_model_1 = __importDefault(require("../models/ext-contact-type.model"));
const { EXT_CONTACT_TABLE } = ext_contacts_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(EXT_CONTACT_TABLE, "dni", {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(20),
        });
        yield queryInterface.addColumn(EXT_CONTACT_TABLE, "ext_contact_type_id_ext_contact_type", {
            allowNull: true,
            field: "ext_contact_type_id_ext_contact_type",
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: ext_contact_type_model_1.default.EXT_CONTACT_TYPE_TABLE,
                key: "id_ext_contact_type",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(EXT_CONTACT_TABLE, "dni");
        yield queryInterface.removeColumn(EXT_CONTACT_TABLE, "ext_contact_type_id_ext_contact_type");
    });
}
exports.down = down;

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
const permission_model_1 = __importDefault(require("../models/permission.model"));
const { PERMISSION_TABLE } = permission_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(PERMISSION_TABLE, "id_permission_main", {
            allowNull: true,
            field: "id_permission_main",
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: PERMISSION_TABLE,
                key: "id_permission",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addColumn(PERMISSION_TABLE, "is_dropdown", {
            allowNull: true,
            field: "is_dropdown",
            type: sequelize_1.DataTypes.BOOLEAN,
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(PERMISSION_TABLE, "id_permission_main");
        yield queryInterface.removeColumn(PERMISSION_TABLE, "is_dropdown");
    });
}
exports.down = down;

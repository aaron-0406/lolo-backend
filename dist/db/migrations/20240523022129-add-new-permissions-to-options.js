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
exports.up = void 0;
const sequelize_1 = require("sequelize");
const permission_model_1 = __importDefault(require("../models/permission.model"));
const { PERMISSION_TABLE } = permission_model_1.default;
const newPermissions = [
    {
        name: "OPT CLIENTES",
        code: "P30",
        icon: "-",
        link: "#",
        id_permission_main: 2,
        is_dropdown: true,
    },
    {
        name: "OPT EXPEDIENTES",
        code: "P31",
        icon: "-",
        link: "#",
        id_permission_main: 60,
        is_dropdown: true,
    },
];
const updatePermissionsCustomers = [42, 46, 101, 105, 127, 38];
const updatePermissionsCaseFiles = [154, 141, 145, 159, 165, 115, 119, 123];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
        const newIdCustomersOptionsResult = yield queryInterface.sequelize.query(`SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P30'`, { type: sequelize_1.QueryTypes.SELECT });
        const newIdCustomersOptions = Array.isArray(newIdCustomersOptionsResult) &&
            newIdCustomersOptionsResult.length
            ? newIdCustomersOptionsResult[0]
                .id_permission
            : null;
        const newIdCaseFilesOptionsResult = yield queryInterface.sequelize.query(`SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P31'`, { type: sequelize_1.QueryTypes.SELECT });
        const newIdCaseFilesOptions = Array.isArray(newIdCaseFilesOptionsResult) &&
            newIdCaseFilesOptionsResult.length
            ? newIdCaseFilesOptionsResult[0]
                .id_permission
            : null;
        if (newIdCustomersOptions !== null) {
            yield queryInterface.bulkUpdate(PERMISSION_TABLE, { id_permission_main: newIdCustomersOptions }, { id_permission: { [sequelize_1.Op.in]: updatePermissionsCustomers } });
        }
        if (newIdCaseFilesOptions !== null) {
            yield queryInterface.bulkUpdate(PERMISSION_TABLE, { id_permission_main: newIdCaseFilesOptions }, { id_permission: { [sequelize_1.Op.in]: updatePermissionsCaseFiles } });
        }
    });
}
exports.up = up;

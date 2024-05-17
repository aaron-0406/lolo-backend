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
const role_permission_model_1 = __importDefault(require("../models/many-to-many/role-permission.model"));
const { PERMISSION_TABLE } = permission_model_1.default;
const { ROLE_PERMISSION_TABLE } = role_permission_model_1.default;
const removePermissions = [
    {
        name: "FIADORES",
        code: "P02-02-04",
        icon: "-",
        link: "#",
    },
    {
        name: "AGREGAR FIADOR",
        code: "P02-02-04-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR FIADOR",
        code: "P02-02-04-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR FIADOR",
        code: "P02-02-04-03",
        icon: "-",
        link: "#",
    },
];
const permissionIdsDelete = [75, 76, 77, 78];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkDelete(ROLE_PERMISSION_TABLE, {
            permission_id_permission: {
                [sequelize_1.Op.in]: permissionIdsDelete,
            },
        });
        yield queryInterface.bulkDelete(PERMISSION_TABLE, {
            [sequelize_1.Op.or]: removePermissions,
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const reincertPermission = [
            {
                name: "FIADORES",
                code: "P02-02-04",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR FIADOR",
                code: "P02-02-04-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR FIADOR",
                code: "P02-02-04-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR FIADOR",
                code: "P02-02-04-03",
                icon: "-",
                link: "#",
            },
        ];
        yield queryInterface.bulkInsert(PERMISSION_TABLE, reincertPermission);
    });
}
exports.down = down;

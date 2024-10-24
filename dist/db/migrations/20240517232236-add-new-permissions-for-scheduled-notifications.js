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
const newPermissions = [
    {
        name: "CONFIGURACIONES",
        code: "P32",
        icon: "-",
        link: "#",
        id_permission_main: 1,
        is_dropdown: true,
    },
    {
        name: "NOTIFICACIONES PROGRAMADAS",
        code: "P29",
        icon: "ri-notification-2-fill",
        link: "/configuracion/:urlIdentifier/notificationes-programadas",
        id_permission_main: 185,
    },
    {
        name: "AGREGAR NOTIFICACION PROGRAMADA",
        code: "P29-01",
        icon: "-",
        link: "#",
    },
    {
        name: "EDITAR NOTIFICACION PROGRAMADA",
        code: "P29-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR NOTIFICACION PROGRAMADA",
        code: "P29-03",
        icon: "-",
        link: "#",
    },
    {
        name: "ASIGNAR NOTIFICACION PROGRAMADA",
        code: "P29-04",
        icon: "-",
        link: "#",
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteCriteria = {
            code: {
                [sequelize_1.Op.startsWith]: ["P29"],
            },
        };
        yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
    });
}
exports.down = down;

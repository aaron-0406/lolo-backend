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
        name: "BITACORA",
        code: "P13-01-01",
        icon: "-",
        link: "/judicial/:urlIdentifier/expediente/:code/bitacora",
    },
    {
        name: "AGREGAR BITACORA",
        code: "P13-01-01-01",
        icon: "-",
        link: "#",
    },
    {
        name: "EDITAR BITACORA",
        code: "P13-01-01-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR BITACORA",
        code: "P13-01-01-03",
        icon: "-",
        link: "#",
    },
    {
        name: "ETAPA PROCEDIMENTAL",
        code: "P24",
        icon: "ri-book-2-fill",
        link: "/judicial/:urlIdentifier/etapa-procedimental",
    },
    {
        name: "CREAR ETAPA PROCEDIMENTAL",
        code: "P24-01",
        icon: "-",
        link: "#",
    },
    {
        name: "EDITAR ETAPA PROCEDIMENTAL",
        code: "P24-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR ETAPA PROCEDIMENTAL",
        code: "P24-03",
        icon: "-",
        link: "#",
    },
    {
        name: "TIPO BITACORA",
        code: "P25",
        icon: "ri-book-2-fill",
        link: "/judicial/:urlIdentifier/tipo-bitacora",
    },
    {
        name: "CREAR TIPO BITACORA",
        code: "P25-01",
        icon: "-",
        link: "#",
    },
    {
        name: "EDITAR TIPO BITACORA",
        code: "P25-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR TIPO BITACORA",
        code: "P25-03",
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
                [sequelize_1.Op.startsWith]: ["P13-05", "P24", "P25"],
            },
        };
        yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
    });
}
exports.down = down;

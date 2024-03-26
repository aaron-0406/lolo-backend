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
        name: "VER PERFIL",
        code: "P01-03",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE CLIENTES",
        code: "P02-06",
        icon: "-",
        link: "#",
    },
    {
        name: "VER DATOS CLIENTE",
        code: "P02-02-08",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE COMENTARIOS",
        code: "P02-02-01-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE ARCHIVOS",
        code: "P02-02-03-05",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE FIADORES",
        code: "P02-02-04-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE DIRECCIONES",
        code: "P02-02-05-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE PRODUCTOS",
        code: "P02-02-06-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE CONTACTOS",
        code: "P02-02-07-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE METAS",
        code: "P04-05",
        icon: "-",
        link: "#",
    },
    {
        name: "VER DATOS DE META",
        code: "P04-06",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE ACCIONES",
        code: "P07-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE FUNCIONARIOS",
        code: "P08-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE NEGOCIACIONES",
        code: "P09-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE USUARIOS",
        code: "P10-05",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE ROLES",
        code: "P11-04",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE AUDITORIA",
        code: "P12-01",
        icon: "-",
        link: "#",
    },
    {
        name: "VER LISTA DE ETIQUETAS",
        code: "P14-04",
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
        const codesToDelete = newPermissions.map((permission) => permission.code);
        const deleteCriteria = {
            code: { [sequelize_1.Op.in]: codesToDelete },
        };
        yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
    });
}
exports.down = down;

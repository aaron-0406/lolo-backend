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
const permission_model_1 = __importDefault(require("../models/permission.model"));
const { PERMISSION_TABLE } = permission_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        return queryInterface.bulkInsert(PERMISSION_TABLE, [
            {
                name: "ACCIONES",
                code: "P07",
                icon: "ri-pencil-ruler-2-fill",
                link: "/cobranza/:urlIdentifier/acciones",
            },
            {
                name: "AGREGAR ACCIÓN",
                code: "P07-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR ACCIÓN",
                code: "P07-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR ACCIÓN",
                code: "P07-03",
                icon: "-",
                link: "#",
            },
            {
                name: "FUNCIONARIOS",
                code: "P08",
                icon: "ri-briefcase-fill",
                link: "/cobranza/:urlIdentifier/funcionarios",
            },
            {
                name: "AGREGAR FUNCIONARIO",
                code: "P08-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR FUNCIONARIO",
                code: "P08-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR FUNCIONARIO",
                code: "P08-03",
                icon: "-",
                link: "#",
            },
            {
                name: "NEGOCIACIONES",
                code: "P09",
                icon: "ri-folder-2-fill",
                link: "/cobranza/:urlIdentifier/negociaciones",
            },
            {
                name: "AGREGAR NEGOCIACIÓN",
                code: "P09-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR NEGOCIACIÓN",
                code: "P09-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR NEGOCIACIÓN",
                code: "P09-03",
                icon: "-",
                link: "#",
            },
            {
                name: "USUARIOS",
                code: "P10",
                icon: "ri-user-settings-fill",
                link: "/:urlIdentifier/usuarios",
            },
            {
                name: "AGREGAR USUARIO",
                code: "P10-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR USUARIO",
                code: "P10-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR USUARIO",
                code: "P10-03",
                icon: "-",
                link: "#",
            },
            {
                name: "HABILITAR / INHABILITAR USUARIO",
                code: "P10-04",
                icon: "-",
                link: "#",
            },
            {
                name: "ROLES",
                code: "P11",
                icon: "ri-shield-user-line",
                link: "/:urlIdentifier/roles",
            },
            {
                name: "AGREGAR ROL",
                code: "P11-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR ROL",
                code: "P11-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR ROL",
                code: "P11-03",
                icon: "-",
                link: "#",
            },
        ]);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        return queryInterface.bulkDelete(PERMISSION_TABLE, {});
    });
}
exports.down = down;

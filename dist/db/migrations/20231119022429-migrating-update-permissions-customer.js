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
        const deleteCriteria = {
            code: {
                [sequelize_1.Op.startsWith]: ["P07", "P08", "P09", "P11"],
            },
        };
        const newPermissions = [
            {
                name: "CONFIGURACIONES",
                code: "P07",
                icon: "-",
                link: "#",
                drop_down: 1,
            },
            {
                name: "INACTIVO",
                code: "P08",
                icon: "-",
                link: "#",
            },
            {
                name: "INACTIVO",
                code: "P09",
                icon: "-",
                link: "#",
            },
            {
                name: "INACTIVO",
                code: "P11",
                icon: "-",
                link: "#",
            },
            {
                name: "ACCIONES",
                code: "P07-01",
                icon: "ri-pencil-ruler-2-fill",
                link: "/cobranza/:urlIdentifier/acciones",
            },
            {
                name: "AGREGAR ACCIÓN",
                code: "P07-01-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR ACCIÓN",
                code: "P07-01-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR ACCIÓN",
                code: "P07-01-03",
                icon: "-",
                link: "#",
            },
            {
                name: "FUNCIONARIOS",
                code: "P07-02",
                icon: "ri-briefcase-fill",
                link: "/cobranza/:urlIdentifier/funcionarios",
            },
            {
                name: "AGREGAR FUNCIONARIO",
                code: "P07-02-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR FUNCIONARIO",
                code: "P07-02-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR FUNCIONARIO",
                code: "P07-02-03",
                icon: "-",
                link: "#",
            },
            {
                name: "NEGOCIACIONES",
                code: "P07-03",
                icon: "ri-folder-2-fill",
                link: "/cobranza/:urlIdentifier/negociaciones",
            },
            {
                name: "AGREGAR NEGOCIACIÓN",
                code: "P07-03-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR NEGOCIACIÓN",
                code: "P07-03-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR NEGOCIACIÓN",
                code: "P07-03-03",
                icon: "-",
                link: "#",
            },
            {
                name: "ROLES",
                code: "P07-04",
                icon: "ri-shield-user-line",
                link: "/:urlIdentifier/roles",
            },
            {
                name: "AGREGAR ROL",
                code: "P07-04-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR ROL",
                code: "P07-04-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR ROL",
                code: "P07-04-01",
                icon: "-",
                link: "#",
            },
        ];
        return queryInterface.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria, {
                transaction,
            });
            yield queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions, {
                transaction,
            });
        }));
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteCriteria = {
            code: {
                [sequelize_1.Op.startsWith]: ["P07", "P08", "P09", "P11"],
            },
        };
        const addPermissions = [
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
        ];
        return queryInterface.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria, {
                transaction,
            });
            yield queryInterface.bulkInsert(PERMISSION_TABLE, addPermissions, {
                transaction,
            });
        }));
    });
}
exports.down = down;

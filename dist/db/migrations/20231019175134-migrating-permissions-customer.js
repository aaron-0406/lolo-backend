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
                [sequelize_1.Op.and]: [{ [sequelize_1.Op.startsWith]: "P03" }, { [sequelize_1.Op.notLike]: "P03-%" }],
            },
        };
        const newPermissions = [
            {
                name: "COMENTARIOS",
                code: "P02-02",
                icon: "-",
                link: "/cobranza/:urlIdentifier/clientes/:code",
            },
            {
                name: "AGREGAR COMENTARIO",
                code: "P02-02-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR COMENTARIO",
                code: "P02-02-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR COMENTARIO",
                code: "P02-02-03",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR CLIENTE",
                code: "P02-03",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR CLIENTE",
                code: "P02-04",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR CLIENTE",
                code: "P02-05",
                icon: "-",
                link: "#",
            },
            {
                name: "WORD - DESCARGAR INFORMACIÓN DEL CLIENTE",
                code: "P02-06",
                icon: "-",
                link: "#",
            },
            {
                name: "ARCHIVOS",
                code: "P02-07",
                icon: "-",
                link: "#",
            },
            {
                name: "VER ARCHIVO",
                code: "P02-07-01",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR ARCHIVO",
                code: "P02-07-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR ARCHIVO",
                code: "P02-07-03",
                icon: "-",
                link: "#",
            },
            {
                name: "FIADORES",
                code: "P02-08",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR FIADOR",
                code: "P02-08-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR FIADOR",
                code: "P02-08-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR FIADOR",
                code: "P02-08-03",
                icon: "-",
                link: "#",
            },
            {
                name: "DIRECCIONES",
                code: "P02-09",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR DIRECCIÓN",
                code: "P02-09-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR DIRECCIÓN",
                code: "P02-09-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR DIRECCIÓN",
                code: "P02-09-03",
                icon: "-",
                link: "#",
            },
            {
                name: "PRODUCTOS",
                code: "P02-10",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR PRODUCTO",
                code: "P02-10-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR PRODUCTO",
                code: "P02-10-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR PRODUCTO",
                code: "P02-10-03",
                icon: "-",
                link: "#",
            },
        ];
        return queryInterface.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete(PERMISSION_TABLE, { deleteCriteria }, { transaction });
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
                [sequelize_1.Op.and]: [{ [sequelize_1.Op.startsWith]: "P02" }, { [sequelize_1.Op.notLike]: "P02-%" }],
            },
        };
        const addPermissions = [
            {
                name: "COMENTARIOS",
                code: "P03-01",
                icon: "-",
                link: "/cobranza/:urlIdentifier/cobranza/:code",
            },
            {
                name: "AGREGAR CLIENTE",
                code: "P03-02",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR COMENTARIO",
                code: "P03-03-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR COMENTARIO",
                code: "P03-03-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR COMENTARIO",
                code: "P03-03-03",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR CLIENTE",
                code: "P03-03",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR CLIENTE",
                code: "P03-04",
                icon: "-",
                link: "#",
            },
            {
                name: "WORD - DESCARGAR INFORMACIÓN DEL CLIENTE",
                code: "P03-05",
                icon: "-",
                link: "#",
            },
            {
                name: "ARCHIVOS",
                code: "P03-06",
                icon: "-",
                link: "#",
            },
            {
                name: "VER ARCHIVO",
                code: "P03-06-01",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR ARCHIVO",
                code: "P03-06-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR ARCHIVO",
                code: "P03-06-03",
                icon: "-",
                link: "#",
            },
            {
                name: "FIADORES",
                code: "P03-07",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR FIADOR",
                code: "P03-07-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR FIADOR",
                code: "P03-07-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR FIADOR",
                code: "P03-07-03",
                icon: "-",
                link: "#",
            },
            {
                name: "DIRECCIONES",
                code: "P03-08",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR DIRECCIÓN",
                code: "P03-08-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR DIRECCIÓN",
                code: "P03-08-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR DIRECCIÓN",
                code: "P03-08-03",
                icon: "-",
                link: "#",
            },
            {
                name: "PRODUCTOS",
                code: "P03-09",
                icon: "-",
                link: "#",
            },
            {
                name: "AGREGAR PRODUCTO",
                code: "P03-09-01",
                icon: "-",
                link: "#",
            },
            {
                name: "ACTUALIZAR PRODUCTO",
                code: "P03-09-02",
                icon: "-",
                link: "#",
            },
            {
                name: "ELIMINAR PRODUCTO",
                code: "P03-09-03",
                icon: "-",
                link: "#",
            },
        ];
        return queryInterface.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete(PERMISSION_TABLE, { deleteCriteria }, { transaction });
            yield queryInterface.bulkInsert(PERMISSION_TABLE, addPermissions, {
                transaction,
            });
        }));
    });
}
exports.down = down;

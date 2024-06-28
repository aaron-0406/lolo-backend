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
const dropdownGarantias = {
    name: "OPT GARANTIAS",
    code: "P37",
    icon: "-",
    link: "#",
    id_permission_main: 60,
    is_dropdown: true,
};
const codesOptGarantias = ["P38", "P39", "P40", "P41"];
const newPermissions = [
    {
        name: "USO DEL BIEN",
        code: "P38",
        icon: "ri-home-2-fill",
        link: "/judicial/:urlIdentifier/uso-del-bien",
    },
    {
        name: "AGREGAR USO DEL BIEN",
        code: "P38-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR USO DEL BIEN",
        code: "P38-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR USO DEL BIEN",
        code: "P38-03",
        icon: "-",
        link: "#",
    },
    {
        name: "ZONA REGISTRAL",
        code: "P39",
        icon: "ri-road-map-fill",
        link: "/judicial/:urlIdentifier/zona-registral",
    },
    {
        name: "AGREGAR ZONA REGISTRAL",
        code: "P39-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR ZONA REGISTRAL",
        code: "P39-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR ZONA REGISTRAL",
        code: "P39-03",
        icon: "-",
        link: "#",
    },
    {
        name: "OFICINA REGISTRAL",
        code: "P40",
        icon: "ri-building-fill",
        link: "/judicial/:urlIdentifier/oficina-registral",
    },
    {
        name: "AGREGAR OFICINA REGISTRAL",
        code: "P40-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR OFICINA REGISTRAL",
        code: "P40-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR OFICINA REGISTRAL",
        code: "P40-03",
        icon: "-",
        link: "#",
    },
    {
        name: "NOTARIA",
        code: "P41",
        icon: "ri-article-fill",
        link: "/judicial/:urlIdentifier/notaria",
    },
    {
        name: "AGREGAR NOTARIA",
        code: "P41-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR NOTARIA",
        code: "P41-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR NOTARIA",
        code: "P41-03",
        icon: "-",
        link: "#",
    },
    {
        name: "GARANTIAS",
        code: "P13-01-06",
        icon: "ri-red-packet-line",
        link: "/judicial/:urlIdentifier/expediente/:code/garantia",
    },
    {
        name: "DETALLE GARANTIA",
        code: "P13-01-06-01",
        icon: "-",
        link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode",
    },
    {
        name: "ASIGNAR GARANTIA",
        code: "P13-01-06-01-01",
        icon: "-",
        link: "#",
    },
    {
        name: "AGREGAR GARANTÍA",
        code: "P13-01-06-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR GARANTÍA",
        code: "P13-01-06-03",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR GARANTÍA",
        code: "P13-01-06-04",
        icon: "-",
        link: "#",
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        let permissionsOpt = [];
        yield queryInterface.bulkInsert(PERMISSION_TABLE, [dropdownGarantias]);
        const dropdownGarantiasId = yield queryInterface.sequelize.query(`SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P37'`, { type: sequelize_1.QueryTypes.SELECT });
        const newIdPermissionDropdownGarantias = Array.isArray(dropdownGarantiasId) &&
            dropdownGarantiasId.length
            ? dropdownGarantiasId[0]
                .id_permission
            : null;
        if (newIdPermissionDropdownGarantias) {
            newPermissions.forEach((permission) => {
                if (codesOptGarantias.includes(permission.code)) {
                    permissionsOpt.push(Object.assign(Object.assign({}, permission), { id_permission_main: newIdPermissionDropdownGarantias }));
                }
            });
        }
        const permissionsActions = newPermissions.filter((permission) => !codesOptGarantias.includes(permission.code));
        yield queryInterface.bulkInsert(PERMISSION_TABLE, permissionsOpt);
        yield queryInterface.bulkInsert(PERMISSION_TABLE, permissionsActions);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteCriteria = {
            code: {
                [sequelize_1.Op.startsWith]: ["P37", "P38", "P39", "P40", "P41", "P13-01-06"],
            },
        };
        yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
    });
}
exports.down = down;

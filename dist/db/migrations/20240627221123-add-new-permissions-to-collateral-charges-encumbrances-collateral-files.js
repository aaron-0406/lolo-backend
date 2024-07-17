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
const codesOptGarantias = ["P42"];
const newPermissions = [
    {
        name: "TIPO DE CARGA",
        code: "P42",
        icon: "ri-file-shield-2-fill",
        link: "/judicial/:urlIdentifier/tipos-cargas-y-gravamenes",
    },
    {
        name: "AGREGAR TIPO DE CARGA - CARGAS Y GRAVAMENES",
        code: "P42-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR TIPO DE CARGA - CARGAS Y GRAVAMENES",
        code: "P42-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR TIPO DE CARGA - CARGAS Y GRAVAMENES",
        code: "P42-03",
        icon: "-",
        link: "#",
    },
    {
        name: "CARGAS Y GRAVAMENES",
        code: "P13-01-06-01-02",
        icon: "ri-folder-shield-2-fill",
        link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode/cargas-y-gravamenes",
    },
    {
        name: "AGREGAR CARGAS Y GRAVAMENES",
        code: "P13-01-06-01-02-01",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR CARGAS Y GRAVAMENES",
        code: "P13-01-06-01-02-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR CARGAS Y GRAVAMENES",
        code: "P13-01-06-01-02-03",
        icon: "-",
        link: "#",
    },
    {
        name: "ARCHIVOS",
        code: "P13-01-06-01-03",
        icon: "ri-file-4-line",
        link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode/archivos",
    },
    {
        name: "VER ARCHIVO",
        code: "P13-01-06-01-03-01",
        icon: "-",
        link: "#",
    },
    {
        name: "AGREGAR VER ARCHIVO",
        code: "P13-01-06-01-03-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ACTUALIZAR ARCHIVO",
        code: "P13-01-06-01-03-03",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR ARCHIVO",
        code: "P13-01-06-01-03-04",
        icon: "-",
        link: "#",
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        let permissionsOpt = [];
        const dropdownGarantiasId = yield queryInterface.sequelize.query(`SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P37'`, { type: sequelize_1.QueryTypes.SELECT });
        const newIdPermissionDropdownGarantias = Array.isArray(dropdownGarantiasId) && dropdownGarantiasId.length
            ? dropdownGarantiasId[0].id_permission
            : null;
        if (newIdPermissionDropdownGarantias) {
            newPermissions.forEach((permission) => {
                if (codesOptGarantias.includes(permission.code)) {
                    permissionsOpt.push(Object.assign(Object.assign({}, permission), { id_permission_main: newIdPermissionDropdownGarantias }));
                }
            });
        }
        const permissionsActions = newPermissions.filter((permission) => !codesOptGarantias.includes(permission.code));
        try {
            if (permissionsOpt.length) {
                yield queryInterface.bulkInsert(PERMISSION_TABLE, permissionsOpt);
            }
            if (permissionsActions.length) {
                yield queryInterface.bulkInsert(PERMISSION_TABLE, permissionsActions);
            }
        }
        catch (error) {
            console.error("Error during bulk insert:", error);
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteCriteria = {
            code: {
                [sequelize_1.Op.startsWith]: ["P42", "P13-01-06-01-02", "P13-01-06-01-03"],
            },
        };
        yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
    });
}
exports.down = down;

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
const role_permission_model_1 = __importDefault(require("../models/many-to-many/role-permission.model"));
const judicial_binnacle_model_1 = __importDefault(require("../models/judicial-binnacle.model"));
const judicial_bin_defendant_procedural_action_model_1 = __importDefault(require("../models/judicial-bin-defendant-procedural-action.model"));
const { PERMISSION_TABLE } = permission_model_1.default;
const { ROLE_PERMISSION_TABLE } = role_permission_model_1.default;
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const { JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE } = judicial_bin_defendant_procedural_action_model_1.default;
const removePermissions = [
    {
        name: "ACTUACIÓN PROCESAL DEMANDADO",
        code: "P26",
        icon: "ri-book-2-fill",
        link: "/judicial/:urlIdentifier/actuacion-procesal-demandado",
    },
    {
        name: "CREAR ACTUACIÓN PROCESAL DEMANDADO",
        code: "P26-01",
        icon: "-",
        link: "#",
    },
    {
        name: "EDITAR ACTUACIÓN PROCESAL DEMANDADO",
        code: "P26-02",
        icon: "-",
        link: "#",
    },
    {
        name: "ELIMINAR ACTUACIÓN PROCESAL DEMANDADO",
        code: "P26-03",
        icon: "-",
        link: "#",
    },
];
const permissionIdsDelete = [159, 160, 161, 162];
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
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, "id_defendant_procedural_action");
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, "defendant_procedural_action_id");
        yield queryInterface.dropTable(JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE);
    });
}
exports.up = up;

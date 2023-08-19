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
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const sequelize_2 = require("sequelize");
const { models } = sequelize_1.default;
class PermissionService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PERMISSION.findAll();
            return rta.map((permission) => ({
                id: permission.dataValues.id,
                name: permission.dataValues.name,
                code: permission.dataValues.code,
                icon: permission.dataValues.icon,
            }));
        });
    }
    findAllByRoleId(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rtaRolePermission = yield models.ROLE_PERMISSION.findAll({
                where: {
                    roleId,
                },
            });
            const permissionIds = rtaRolePermission.map((rolePermission) => {
                return rolePermission.dataValues.permissionId;
            });
            const rta = yield models.PERMISSION.findAll({
                where: {
                    id: { [sequelize_2.Op.in]: permissionIds },
                },
            });
            return rta.map((permission) => ({
                id: permission.dataValues.id,
                name: permission.dataValues.name,
                code: permission.dataValues.code,
                icon: permission.dataValues.icon,
            }));
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield models.PERMISSION.findByPk(id);
            if (!permission) {
                throw boom_1.default.notFound("Permiso no encontrado");
            }
            return permission;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPermission = yield models.PERMISSION.create(data);
            return newPermission;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield this.findOne(id);
            const rta = yield permission.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield this.findOne(id);
            yield permission.destroy();
            return { id };
        });
    }
}
exports.default = PermissionService;

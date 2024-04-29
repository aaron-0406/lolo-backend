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
const { models } = sequelize_1.default;
class RoleService {
    constructor() { }
    findAllByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.ROLE.findAll({
                where: {
                    customerId,
                },
            });
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield models.ROLE.findByPk(id);
            if (!role) {
                throw boom_1.default.notFound("Rol no encontrado");
            }
            return role;
        });
    }
    create(data, permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRole = yield models.ROLE.create(data);
            for (let i = 0; i < permissions.length; i++) {
                const element = permissions[i];
                yield models.ROLE_PERMISSION.create({
                    roleId: newRole.dataValues.id,
                    permissionId: element,
                });
            }
            return newRole;
        });
    }
    update(id, changes, permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.findOne(id);
            const rta = yield role.update(changes);
            yield models.ROLE_PERMISSION.destroy({
                where: {
                    roleId: role.dataValues.id,
                },
            });
            for (let i = 0; i < permissions.length; i++) {
                const element = permissions[i];
                yield models.ROLE_PERMISSION.create({
                    roleId: role.dataValues.id,
                    permissionId: element,
                });
            }
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.findOne(id);
            yield models.ROLE_PERMISSION.destroy({
                where: { roleId: id },
            });
            yield role.destroy();
            return { id };
        });
    }
}
exports.default = RoleService;

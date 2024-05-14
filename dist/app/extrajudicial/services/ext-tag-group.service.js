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
class ExtTagGroupService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_TAG_GROUP.findAll();
            return rta;
        });
    }
    findAllWithOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_TAG_GROUP.findAll({
                order: [["created_at", "DESC"]],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTagGroup = yield models.EXT_TAG_GROUP.findOne({
                where: {
                    id_ext_tag_group: id,
                },
            });
            if (!extTagGroup) {
                throw boom_1.default.notFound("Grupo de etiquetas no encontrada");
            }
            return extTagGroup;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExtTagGroup = yield models.EXT_TAG_GROUP.create(data);
            return newExtTagGroup;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTagGroup = yield this.findByID(id);
            const rta = yield extTagGroup.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTagGroup = yield this.findByID(id);
            yield extTagGroup.destroy();
            return { id };
        });
    }
}
exports.default = ExtTagGroupService;

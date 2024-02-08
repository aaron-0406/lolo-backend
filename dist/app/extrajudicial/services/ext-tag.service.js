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
class ExtTagService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_TAG.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_TAG.findAll({
                include: [
                    {
                        model: models.EXT_TAG_GROUP,
                        as: "extTagGroup",
                        foreignKey: "tagGroupId",
                        identifier: "id",
                        attributes: ["name"],
                    },
                ],
                order: [["created_at", "DESC"]],
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            return rta;
        });
    }
    findAllByCHBAndTagGroupId(chb, tagGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_TAG.findAll({
                order: [["created_at", "DESC"]],
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                    tag_group_id_group_tag: tagGroupId,
                },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTag = yield models.EXT_TAG.findOne({
                where: {
                    id_ext_tag: id,
                },
            });
            if (!extTag) {
                throw boom_1.default.notFound("Etiqueta no encontrada");
            }
            return extTag;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExtTag = yield models.EXT_TAG.create(data);
            return newExtTag;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTag = yield this.findByID(id);
            const rta = yield extTag.update(changes);
            return rta;
        });
    }
    updateAction(id, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTag = yield this.findByID(id);
            const rta = yield extTag.update(Object.assign(Object.assign({}, extTag), { action }));
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extTag = yield this.findByID(id);
            yield extTag.destroy();
            return { id };
        });
    }
}
exports.default = ExtTagService;

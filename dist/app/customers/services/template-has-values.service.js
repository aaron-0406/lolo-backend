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
class TemplateHasValuesService {
    constructor() { }
    findAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const templates = yield models.TEMPLATE_HAS_VALUES.findAll({
                where: { templateId: id },
                attributes: { exclude: ["id_template"] },
            });
            const fields = yield models.ECAMPO.findAll({
                where: { templateId: id },
            });
            return { templates, fields };
        });
    }
    finOneByIdAndTemplateId(id, templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateHasValues = yield models.TEMPLATE_HAS_VALUES.findOne({
                where: {
                    id,
                    templateId,
                },
            });
            if (!templateHasValues)
                throw boom_1.default.notFound("Plantilla no encontrada");
            return templateHasValues;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateHasValues = yield models.TEMPLATE_HAS_VALUES.findOne({
                where: {
                    id,
                },
            });
            if (!templateHasValues)
                throw boom_1.default.notFound("Plantilla no encontrada");
            return templateHasValues;
        });
    }
    create(data, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTemplateHasValues = yield models.TEMPLATE_HAS_VALUES.create(data);
            const { id } = newTemplateHasValues.dataValues;
            const valuesSaved = [];
            for (let i = 0; i < values.length; i++) {
                const element = values[i];
                element.templateHasValuesId = id;
                const newValue = yield models.VALUES.create(element);
                valuesSaved.push(newValue);
            }
            return { newTemplateHasValues, valuesSaved };
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateHasValues = yield this.findOne(id);
            const rta = yield templateHasValues.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateHasValues = yield this.findOne(id);
            yield templateHasValues.destroy();
            return { id };
        });
    }
}
exports.default = TemplateHasValuesService;

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
const helpers_1 = require("../../../libs/helpers");
const path_1 = __importDefault(require("path"));
const aws_bucket_1 = require("../../../libs/aws_bucket");
const config_1 = __importDefault(require("../../../config/config"));
const { models } = sequelize_1.default;
class TemplateService {
    constructor() { }
    findAllByCustomerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.TEMPLATE.findAll({
                where: { customerId: id },
            });
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = yield models.TEMPLATE.findOne({
                where: { id },
                include: { model: models.TEMPLATE_IMG, as: "template_imgs" },
            });
            if (!template)
                throw boom_1.default.notFound("Plantilla no encontrada");
            try {
                if (template.dataValues.templateJson !== "") {
                    const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), template.dataValues.templateJson);
                    if (!isStored) {
                        yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_PLANTILLA_PATH}${template.dataValues.customerId}/${template.dataValues.templateJson}`);
                    }
                }
                if (template.dataValues.templatePhoto !== "") {
                    const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), template.dataValues.templatePhoto);
                    if (!isStored) {
                        yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_PLANTILLA_PATH}${template.dataValues.customerId}/${template.dataValues.templatePhoto}`);
                    }
                }
                for (let i = 0; i < template.dataValues.template_imgs.length; i++) {
                    const element = template.dataValues.template_imgs[i];
                    yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_PLANTILLA_PATH}${template.dataValues.customerId}/${element.img}`);
                }
            }
            catch (error) { }
            return template;
        });
    }
}
exports.default = TemplateService;

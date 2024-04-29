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
exports.getTemplateByIdController = exports.getTemplateByCustomerIdController = void 0;
const template_service_1 = __importDefault(require("../../app/extrajudicial/services/template.service"));
const service = new template_service_1.default();
const getTemplateByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const template = yield service.findAllByCustomerId(id);
        res.json(template);
    }
    catch (error) {
        next(error);
    }
});
exports.getTemplateByCustomerIdController = getTemplateByCustomerIdController;
const getTemplateByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const template = yield service.findOne(id);
        res.json(template);
    }
    catch (error) {
        next(error);
    }
});
exports.getTemplateByIdController = getTemplateByIdController;

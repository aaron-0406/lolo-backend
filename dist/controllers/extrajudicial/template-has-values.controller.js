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
exports.deleteTemplateHasValues = exports.updateTemplateHasValues = exports.createTemplateHasValuesController = exports.getTemplateHasValuesByCustomerIdController = exports.getTemplateHasValuesByTemplateIdController = void 0;
const template_has_values_service_1 = __importDefault(require("../../app/extrajudicial/services/template-has-values.service"));
const values_service_1 = __importDefault(require("../../app/extrajudicial/services/values.service"));
const service = new template_has_values_service_1.default();
const serviceValues = new values_service_1.default();
const getTemplateHasValuesByTemplateIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const templateHasValues = yield service.findAll(id);
        res.json(templateHasValues);
    }
    catch (error) {
        next(error);
    }
});
exports.getTemplateHasValuesByTemplateIdController = getTemplateHasValuesByTemplateIdController;
const getTemplateHasValuesByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tenpmateGasValues = yield service.findByCustomerId(id);
        res.json(tenpmateGasValues);
    }
    catch (error) {
        next(error);
    }
});
exports.getTemplateHasValuesByCustomerIdController = getTemplateHasValuesByCustomerIdController;
const createTemplateHasValuesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { name, templateId, values }, } = req;
        const newTemplateHasValues = yield service.create({ name, templateId });
        const valuesSaved = [];
        for (let i = 0; i < values.length; i++) {
            const element = values[i];
            element.templateHasValuesId = newTemplateHasValues.dataValues.id;
            const newValue = yield serviceValues.createValue(element);
            valuesSaved.push(newValue);
        }
        res.status(201).json({
            template_has_values: newTemplateHasValues,
            values: valuesSaved,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createTemplateHasValuesController = createTemplateHasValuesController;
const updateTemplateHasValues = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body: { name, values }, } = req;
        const tenpmateHasValues = yield service.update(id, name);
        for (let i = 0; i < values.length; i++) {
            const element = values[i];
            yield serviceValues.update(element.id, element);
        }
        res.json({
            template_has_values: tenpmateHasValues,
            values: values,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTemplateHasValues = updateTemplateHasValues;
const deleteTemplateHasValues = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTemplateHasValues = deleteTemplateHasValues;

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
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const template_has_values_schema_1 = __importDefault(require("../app/customers/schemas/template-has-values.schema"));
const template_has_values_service_1 = __importDefault(require("../app/customers/services/template-has-values.service"));
const values_service_1 = __importDefault(require("../app/customers/services/values.service"));
const { createTemplateHasValuesSchema, updateTemplateHasValuesSchema, getTemplateHasValuesByIdSchema, } = template_has_values_schema_1.default;
const router = express_1.default.Router();
const service = new template_has_values_service_1.default();
const serviceValues = new values_service_1.default();
router.get("/:id", (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const templateHasValues = yield service.findAll(id);
        res.json(templateHasValues);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/customer/:id", (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tenpmateGasValues = yield service.findByCustomerId(id);
        res.json(tenpmateGasValues);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createTemplateHasValuesSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
router.put("/:id", (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), (0, validator_handler_1.default)(updateTemplateHasValuesSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
router.delete("/:id", (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

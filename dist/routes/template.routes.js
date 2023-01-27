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
const template_schema_1 = __importDefault(require("../app/customers/schemas/template.schema"));
const template_service_1 = __importDefault(require("../app/customers/services/template.service"));
const { getTemplateByCustomerIdSchema } = template_schema_1.default;
const router = express_1.default.Router();
const service = new template_service_1.default();
router.get("/:id", (0, validator_handler_1.default)(getTemplateByCustomerIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Template = yield service.findAllByCustomerId(id);
        res.json(Template);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

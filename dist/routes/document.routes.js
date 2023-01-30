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
const docx_1 = require("docx");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const template_has_values_service_1 = __importDefault(require("../app/customers/services/template-has-values.service"));
const document_service_1 = __importDefault(require("../app/customers/services/document.service"));
const document_schema_1 = __importDefault(require("../app/customers/schemas/document.schema"));
const client_service_1 = __importDefault(require("../app/extrajudicial/services/client.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const { createDocumentSchema } = document_schema_1.default;
const router = express_1.default.Router();
const serviceTemplate = new template_has_values_service_1.default();
const serviceClient = new client_service_1.default();
const service = new document_service_1.default();
router.post("/", (0, validator_handler_1.default)(createDocumentSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { templateHasValuesId, usersId }, } = req;
        const templateHasValues = yield serviceTemplate.findOneWidthTemplate(templateHasValuesId);
        const clients = yield serviceClient.findAllBDetailsAndClientsId(usersId);
        const doc = yield service.generateDocument(templateHasValues, clients);
        const docName = `${new Date().getTime()} - ${templateHasValues.name}.docx`;
        const buffer = yield docx_1.Packer.toBuffer(doc);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../public/download", docName), buffer);
        res.json({ docName });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
exports.default = router;

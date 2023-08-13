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
exports.generateDocumentController = void 0;
const template_has_values_service_1 = __importDefault(require("../app/customers/services/template-has-values.service"));
const document_service_1 = __importDefault(require("../app/customers/services/document.service"));
const client_service_1 = __importDefault(require("../app/extrajudicial/services/client.service"));
const helpers_1 = require("../libs/helpers");
const serviceTemplateHasValues = new template_has_values_service_1.default();
const serviceClient = new client_service_1.default();
const service = new document_service_1.default();
const generateDocumentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { templateHasValuesId, usersId }, } = req;
        const templateHasValues = yield serviceTemplateHasValues.findOneWidthTemplate(templateHasValuesId);
        const clients = yield serviceClient.findAllBDetailsAndClientsId(usersId);
        const doc = yield service.generateDocument(templateHasValues, clients);
        const docName = yield (0, helpers_1.saveWordDocument)(doc, templateHasValues.name);
        res.json({ docName });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.generateDocumentController = generateDocumentController;

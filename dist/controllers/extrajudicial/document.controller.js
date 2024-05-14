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
const template_has_values_service_1 = __importDefault(require("../../app/extrajudicial/services/template-has-values.service"));
const document_service_1 = __importDefault(require("../../app/extrajudicial/services/document.service"));
const client_service_1 = __importDefault(require("../../app/extrajudicial/services/client.service"));
const helpers_1 = require("../../libs/helpers");
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const template_has_values_model_1 = __importDefault(require("../../db/models/many-to-many/template-has-values.model"));
const serviceTemplateHasValues = new template_has_values_service_1.default();
const serviceClient = new client_service_1.default();
const service = new document_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { TEMPLATE_HAS_VALUES_TABLE } = template_has_values_model_1.default;
const generateDocumentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { body: { templateHasValuesId, usersId }, } = req;
        const templateHasValues = yield serviceTemplateHasValues.findOneWidthTemplate(templateHasValuesId);
        const clients = yield serviceClient.findAllBDetailsAndClientsId(usersId);
        const doc = yield service.generateDocument(templateHasValues, clients);
        const docName = yield (0, helpers_1.saveWordDocument)(doc, templateHasValues.name);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-02-02",
            entity: TEMPLATE_HAS_VALUES_TABLE,
            entityId: Number(templateHasValuesId),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json({ docName });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.generateDocumentController = generateDocumentController;

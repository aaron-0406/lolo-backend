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
const boom_1 = __importDefault(require("@hapi/boom"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../../config/config"));
const aws_bucket_1 = require("../../../libs/aws_bucket");
const helpers_1 = require("../../../libs/helpers");
const util_1 = __importDefault(require("util"));
const docx_1 = require("docx");
const fs_1 = __importDefault(require("fs"));
const docx_2 = require("../../../libs/docx");
class DocumentService {
    constructor() { }
    generateDocument(templateHasValues, clients) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si no hay una plantilla configurada en bd
            let image;
            if (templateHasValues.template.templateJson === "")
                throw boom_1.default.badRequest("No hay una plantilla configurada");
            // Si la plantilla ya fue descargada
            const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), templateHasValues.template.templateJson);
            // Si la plantilla no está guardada, descargarla de aws
            if (!isStored) {
                yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_PLANTILLA_PATH}${templateHasValues.template.customerId}/${templateHasValues.template.templateJson}`);
            }
            // Si hay una imagen como fondo
            if (templateHasValues.template.templatePhoto !== "") {
                // Si ya está descargada
                const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), templateHasValues.template.templatePhoto);
                // Si no lo está la descarga
                if (!isStored) {
                    yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_PLANTILLA_PATH}${templateHasValues.template.customerId}/${templateHasValues.template.templatePhoto}`);
                }
                // IMAGEN
                image = new docx_1.ImageRun({
                    floating: {
                        horizontalPosition: {
                            offset: 0,
                        },
                        verticalPosition: {
                            offset: -340000,
                        },
                    },
                    data: fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../public/download", templateHasValues.template.templatePhoto)),
                    transformation: {
                        width: 793,
                        height: 1177,
                    },
                });
            }
            // Reading the template json file
            const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
            const jsonFile = yield readFileAsync(path_1.default.join(__dirname, "../../../public/download", templateHasValues.template.templateJson), "utf8");
            const plantilla = JSON.parse(jsonFile);
            let parrafos = [];
            // Parrafos por cada cliente
            for (let i = 0; i < clients.length; i++) {
                const newPlantilla = JSON.parse(JSON.stringify(plantilla));
                const element = clients[i];
                const texts = this.makeTexts([...newPlantilla.parrafos], templateHasValues.values, element);
                parrafos = [...parrafos, ...texts];
                if (clients.length !== 1 && i < clients.length - 1) {
                    parrafos.push((0, docx_2.createParagraph)([], true));
                }
            }
            const document = this.makeDocument(parrafos, image);
            return document;
            // Configuración del documento
        });
    }
    transformText(text, values, client) {
        if (text === undefined)
            return "";
        for (let i = 0; i < values.length; i++) {
            const element = values[i];
            text = text.replace(`[${element.field}]`, element.value);
        }
        text = text.replace(`[client]`, client.name);
        return text;
    }
    makeDocument(parrafos, image) {
        const doc = new docx_1.Document({
            sections: [
                {
                    headers: {
                        default: new docx_1.Header({
                            children: [
                                new docx_1.Paragraph({
                                    children: [image],
                                }),
                            ],
                        }),
                    },
                    properties: {
                        page: {
                            margin: {
                                top: 1290,
                                left: 1290,
                                bottom: 1290,
                                right: 1290,
                            },
                        },
                    },
                    children: parrafos,
                },
            ],
        });
        return doc;
    }
    makeTexts(parrafos, values, client) {
        var _a, _b;
        const paragraphs = [];
        for (let i = 0; i < parrafos.length; i++) {
            const element = parrafos[i];
            element.texts = (_a = element.texts) === null || _a === void 0 ? void 0 : _a.map((item) => {
                return Object.assign(Object.assign({}, item), { text: this.transformText(item.text, values, client) });
            });
            if (element.texts && element.texts.length > 0) {
                if ((_b = element.texts[0].text) === null || _b === void 0 ? void 0 : _b.includes("[guarantor]")) {
                    for (let j = 0; j < client.guarantor.length; j++) {
                        const guarantor = client.guarantor[j];
                        const parrafo = (0, docx_2.createParagraph)([Object.assign(Object.assign({}, element.texts[0]), { text: guarantor.name })], false, element.options);
                        paragraphs.push(parrafo);
                    }
                    continue;
                }
            }
            if (element.texts && element.texts.length > 0) {
                if (element.texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("direction"); })) {
                    for (let k = 0; k < client.direction.length; k++) {
                        const direction = client.direction[k];
                        let newElement = JSON.parse(JSON.stringify(element.texts));
                        newElement = newElement.map((item) => {
                            var _a;
                            return Object.assign(Object.assign({}, item), { text: (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[direction.type]", direction.type).replace("[direction.direction]", direction.direction) });
                        });
                        const parrafo = (0, docx_2.createParagraph)(newElement, false, element.options);
                        paragraphs.push(parrafo);
                    }
                    continue;
                }
            }
            const parrafo = (0, docx_2.createParagraph)(element.texts ? element.texts : [], false, element.options);
            paragraphs.push(parrafo);
        }
        return paragraphs;
    }
}
exports.default = DocumentService;

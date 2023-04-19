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
                // IMAGEN FONDO
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
            // Imagenes de la plantilla
            for (let i = 0; i < templateHasValues.template.template_imgs.length; i++) {
                const element = templateHasValues.template.template_imgs[i];
                const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), element.img);
                // Por si no están guardadas, descargarlas de aws
                if (!isStored) {
                    yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_PLANTILLA_PATH}${templateHasValues.template.customerId}/${element.img}`);
                }
            }
            // Reading the template json file
            const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
            const jsonFile = yield readFileAsync(path_1.default.join(__dirname, "../../../public/download", templateHasValues.template.templateJson), "utf8");
            const plantilla = JSON.parse(jsonFile);
            let parrafos = [];
            // Parrafos por cada cliente
            for (let i = 0; i < clients.length; i++) {
                // Copy
                const newPlantilla = JSON.parse(JSON.stringify(plantilla));
                const element = clients[i];
                const texts = this.makeTexts([...newPlantilla.parrafos], templateHasValues.values, templateHasValues.template.template_imgs, element);
                // parrafos = [...parrafos, ...texts, ];
                parrafos = [...parrafos, ...texts];
                // Salto de pagina
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
        text = text.replace(`[client.code]`, client.code);
        text = text.replace(`[client.negotiationId]`, String(client.negotiation.name));
        text = text.replace(`[client.dniOrRuc]`, String(client.dniOrRuc));
        text = text.replace(`[client.name]`, client.name);
        text = text.replace(`[client.salePerimeter]`, String(client.salePerimeter));
        text = text.replace(`[client.phone]`, String(client.phone));
        text = text.replace(`[client.email]`, String(client.email));
        text = text.replace(`[client.cityId]`, String(client.city.name));
        text = text.replace(`[client.funcionarioId]`, String(client.funcionario.name));
        text = text.replace(`[client.customerUserId]`, String(`${client.customerUser.name} ${client.customerUser.lastName}`));
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
    makeTexts(parrafos, values, templateImg, client) {
        var _a, _b;
        const paragraphs = [];
        for (let i = 0; i < parrafos.length; i++) {
            const element = parrafos[i];
            element.texts = (_a = element.texts) === null || _a === void 0 ? void 0 : _a.map((item) => {
                return Object.assign(Object.assign({}, item), { text: this.transformText(item.text, values, client) });
            });
            //Tablas
            if (element.tablets &&
                element.tablets.rows &&
                ((_b = element.tablets.rows) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                if (element.tablets.rows[1].children[0].children[0].texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("guarantor"); }) &&
                    !!client.guarantor) {
                    const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
                    let newElement = [
                        JSON.parse(JSON.stringify(element.tablets.rows))[1],
                    ];
                    let rows = [];
                    for (let k = 0; k < client.guarantor.length; k++) {
                        const guarantor = client.guarantor[k];
                        rows.push(...newElement.map((row) => {
                            return {
                                children: row.children.map((cell) => {
                                    return {
                                        children: cell.children.map((paragraph) => {
                                            return {
                                                texts: paragraph.texts.map((item) => {
                                                    var _a, _b, _c, _d;
                                                    return Object.assign(Object.assign({}, item), { text: (_d = (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[guarantor.id]", guarantor.id)) === null || _b === void 0 ? void 0 : _b.replace("[guarantor.name]", guarantor.name)) === null || _c === void 0 ? void 0 : _c.replace("[guarantor.phone]", guarantor.phone)) === null || _d === void 0 ? void 0 : _d.replace("[guarantor.email]", guarantor.email) });
                                                }),
                                            };
                                        }),
                                    };
                                }),
                            };
                        }));
                    }
                    const table = (0, docx_2.createTable)([headerRow, ...rows]);
                    paragraphs.push(table);
                }
                if (element.tablets.rows[1].children[0].children[0].texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("direction"); }) &&
                    !!client.direction) {
                    const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
                    let newElement = [
                        JSON.parse(JSON.stringify(element.tablets.rows))[1],
                    ];
                    let rows = [];
                    for (let k = 0; k < client.direction.length; k++) {
                        const direction = client.direction[k];
                        rows.push(...newElement.map((row) => {
                            return {
                                children: row.children.map((cell) => {
                                    return {
                                        children: cell.children.map((paragraph) => {
                                            return {
                                                texts: paragraph.texts.map((item) => {
                                                    var _a, _b, _c;
                                                    return Object.assign(Object.assign({}, item), { text: (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[direction.id]", direction.id)) === null || _b === void 0 ? void 0 : _b.replace("[direction.type]", direction.type)) === null || _c === void 0 ? void 0 : _c.replace("[direction.direction]", direction.direction) });
                                                }),
                                            };
                                        }),
                                    };
                                }),
                            };
                        }));
                    }
                    const table = (0, docx_2.createTable)([headerRow, ...rows]);
                    paragraphs.push(table);
                }
                if (element.tablets.rows[1].children[0].children[0].texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("product"); }) &&
                    !!client.product) {
                    const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
                    let newElement = [
                        JSON.parse(JSON.stringify(element.tablets.rows))[1],
                    ];
                    let rows = [];
                    for (let k = 0; k < client.product.length; k++) {
                        const product = client.product[k];
                        rows.push(...newElement.map((row) => {
                            return {
                                children: row.children.map((cell) => {
                                    return {
                                        children: cell.children.map((paragraph) => {
                                            return {
                                                texts: paragraph.texts.map((item) => {
                                                    var _a, _b, _c, _d;
                                                    return Object.assign(Object.assign({}, item), { text: (_d = (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[product.id]", product.id)) === null || _b === void 0 ? void 0 : _b.replace("[product.code]", product.code)) === null || _c === void 0 ? void 0 : _c.replace("[product.name]", product.name)) === null || _d === void 0 ? void 0 : _d.replace("[product.state]", product.state) });
                                                }),
                                            };
                                        }),
                                    };
                                }),
                            };
                        }));
                    }
                    const table = (0, docx_2.createTable)([headerRow, ...rows]);
                    paragraphs.push(table);
                }
                if (element.tablets.rows[1].children[0].children[0].texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("comment"); }) &&
                    !!client.comment) {
                    const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
                    let newElement = [
                        JSON.parse(JSON.stringify(element.tablets.rows))[1],
                    ];
                    let rows = [];
                    for (let k = 0; k < client.comment.length; k++) {
                        const comment = client.comment[k];
                        rows.push(...newElement.map((row) => {
                            return {
                                children: row.children.map((cell) => {
                                    return {
                                        children: cell.children.map((paragraph) => {
                                            return {
                                                texts: paragraph.texts.map((item) => {
                                                    var _a, _b, _c, _d, _e;
                                                    return Object.assign(Object.assign({}, item), { text: (_e = (_d = (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[comment.id]", comment.id)) === null || _b === void 0 ? void 0 : _b.replace("[comment.comment]", comment.comment)) === null || _c === void 0 ? void 0 : _c.replace("[comment.negotiation]", comment.negotiation)) === null || _d === void 0 ? void 0 : _d.replace("[comment.date]", comment.date)) === null || _e === void 0 ? void 0 : _e.replace("[comment.hour]", new Date(comment.hour).toLocaleTimeString("es-PE", { hour12: false })) });
                                                }),
                                            };
                                        }),
                                    };
                                }),
                            };
                        }));
                    }
                    const table = (0, docx_2.createTable)([headerRow, ...rows]);
                    paragraphs.push(table);
                }
            }
            // Fiadores
            if (element.texts && element.texts.length > 0) {
                if (element.texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("guarantor"); })) {
                    for (let k = 0; k < client.guarantor.length; k++) {
                        const guarantor = client.guarantor[k];
                        let newElement = JSON.parse(JSON.stringify(element.texts));
                        newElement = newElement.map((item) => {
                            var _a, _b, _c, _d;
                            return Object.assign(Object.assign({}, item), { text: (_d = (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[guarantor.id]", guarantor.id)) === null || _b === void 0 ? void 0 : _b.replace("[guarantor.name]", guarantor.name)) === null || _c === void 0 ? void 0 : _c.replace("[guarantor.phone]", guarantor.phone)) === null || _d === void 0 ? void 0 : _d.replace("[guarantor.email]", guarantor.email) });
                        });
                        const parrafo = (0, docx_2.createParagraph)(newElement, false, element.options);
                        paragraphs.push(parrafo);
                    }
                    continue;
                }
            }
            // Direcciones
            if (element.texts && element.texts.length > 0) {
                if (element.texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("direction"); })) {
                    for (let k = 0; k < client.direction.length; k++) {
                        const direction = client.direction[k];
                        let newElement = JSON.parse(JSON.stringify(element.texts));
                        newElement = newElement.map((item) => {
                            var _a, _b, _c;
                            return Object.assign(Object.assign({}, item), { text: (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[direction.id]", direction.id)) === null || _b === void 0 ? void 0 : _b.replace("[direction.type]", direction.type)) === null || _c === void 0 ? void 0 : _c.replace("[direction.direction]", direction.direction) });
                        });
                        const parrafo = (0, docx_2.createParagraph)(newElement, false, element.options);
                        paragraphs.push(parrafo);
                    }
                    continue;
                }
            }
            // Productos
            if (element.texts && element.texts.length > 0) {
                if (element.texts.some((item) => { var _a; return (_a = item.text) === null || _a === void 0 ? void 0 : _a.includes("product"); })) {
                    for (let k = 0; k < client.product.length; k++) {
                        const product = client.product[k];
                        let newElement = JSON.parse(JSON.stringify(element.texts));
                        newElement = newElement.map((item) => {
                            var _a, _b, _c, _d;
                            return Object.assign(Object.assign({}, item), { text: (_d = (_c = (_b = (_a = item.text) === null || _a === void 0 ? void 0 : _a.replace("[product.id]", product.id)) === null || _b === void 0 ? void 0 : _b.replace("[product.code]", product.code)) === null || _c === void 0 ? void 0 : _c.replace("[product.name]", product.name)) === null || _d === void 0 ? void 0 : _d.replace("[product.state]", product.state) });
                        });
                        const parrafo = (0, docx_2.createParagraph)(newElement, false, element.options);
                        paragraphs.push(parrafo);
                    }
                    continue;
                }
            }
            // Imagenes
            if (element.texts && element.texts.length > 0) {
                if (element.texts.some((text) => text.img)) {
                    for (let l = 0; l < element.texts.length; l++) {
                        const element2 = element.texts[l];
                        if (element2.img) {
                            const filter = templateImg.filter((item) => { var _a; return (_a = element2.img) === null || _a === void 0 ? void 0 : _a.includes(item.img); });
                            if (filter[0]) {
                                const newImg = (0, docx_2.createImgRun)(filter[0].img, filter[0].size, element.options);
                                paragraphs.push(newImg);
                            }
                        }
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

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
const docx_2 = require("../libs/docx");
const router = express_1.default.Router();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = new docx_1.ImageRun({
            floating: {
                horizontalPosition: {
                    offset: 0,
                },
                verticalPosition: {
                    offset: -340000,
                },
            },
            data: fs_1.default.readFileSync(path_1.default.join(__dirname, "../img/cabecera_hidalgo_vidal.png")),
            transformation: {
                width: 793,
                height: 1177,
            },
        });
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
                    children: [
                        (0, docx_2.createParagraph)([{ fontSize: 11 }], {
                            spacingAfter: 8,
                        }),
                        (0, docx_2.createParagraph)([{ fontSize: 11 }], {
                            spacingAfter: 8,
                        }),
                        (0, docx_2.createParagraph)([{ fontSize: 11, text: "Chiclayo, agosto del 2022." }], {
                            spacingAfter: 8,
                            align: docx_1.AlignmentType.END,
                        }),
                        (0, docx_2.createParagraph)([{ text: "Señor(a) (es):" }]),
                        (0, docx_2.createParagraph)([{ text: "ALAYO GONZALES JUAN CARLOS" }]),
                        (0, docx_2.createParagraph)([{ text: "MARCO ROJAS ROXANA MARIBEL" }]),
                        (0, docx_2.createParagraph)([{}]),
                        (0, docx_2.createParagraph)([
                            { text: "DIR. DOMICILIARIA: ", bold: true },
                            {
                                text: "CALLE CIRCUNVALACIÓN N° 198, U.P.I.S. PRIMERO DE MAYO, DISTRITO JOSE LEONARDO ORTIZ; PROVINCIA DE CHICLAYO, DEPARTAMENTO DE LAMBAYEQUE.",
                            },
                        ]),
                        (0, docx_2.createParagraph)([
                            { text: "DIR. GARANTÍA: ", bold: true },
                            {
                                text: "CALLE ARICA N° 640 INT. 151, DISTRITO DE CHICLAYO; PROVINCIA DE CHICLAYO, DEPARTAMENTO DE LAMBAYEQUE.",
                            },
                        ]),
                        (0, docx_2.createParagraph)([{}]),
                        (0, docx_2.createParagraph)([{ text: "De nuestra consideración. -" }], {
                            spacingAfter: 12,
                        }),
                        (0, docx_2.createParagraph)([
                            {
                                text: "Por la presente, le informamos que el Estudio encargado de la cobranza de las acreencias que mantiene con el ",
                            },
                            {
                                text: "BANCO DE CRÉDITO DEL PERÚ ",
                                bold: true,
                            },
                            {
                                text: "S.A. es el Estudio ",
                            },
                            {
                                text: "HIDALGO VIDAL & ABOGADOS ASOCIADOS S.C.R.L.; ",
                                bold: true,
                            },
                            {
                                text: "siendo la actual persona autorizada para la cobranza de sus acreencias la Srta. Maryelyn Elaine Villegas Flores (Teléfono: 970139578).",
                            },
                        ], { spacingAfter: 12 }),
                        (0, docx_2.createParagraph)([
                            {
                                text: "En ese sentido, al mantener Usted a la fecha Deuda(s) pendiente(s) de pago, hemos iniciado las acciones judiciales correspondientes; ejecutando las medidas que la ley nos ampara, conforme a lo establecido en el inciso 1 del Artículo 1219° del Código Civil y demás normas pertinentes, a fin de recuperar nuestra acreencia – saldo adeudado; más los intereses pactados, costas y costos que se originen.",
                            },
                        ], { spacingAfter: 12 }),
                        (0, docx_2.createParagraph)([
                            {
                                text: "Sin embargo, nuestra representada le ofrece la oportunidad de negociar la cancelación de su deuda; por lo que, lo invitamos a nuestra oficina sito en ",
                            },
                            {
                                text: "CALLE RIO SANTIAGO N° 100, DPTO. 101, URB. CAFÉ PERÚ - CHICLAYO",
                                bold: true,
                            },
                            {
                                text: ", en horario de oficina de ",
                            },
                            {
                                bold: true,
                                text: "lunes a viernes de 8:00 a.m. a 1:00 p.m. y de 4:00 p.m. a 6:00 p.m",
                            },
                            {
                                text: "con previa cita, donde nuestra área de cobranza extrajudicial y abogados lo atenderán; con la finalidad de brindarle alternativas de solución respecto a su caso",
                            },
                        ], { spacingAfter: 12 }),
                        (0, docx_2.createParagraph)([
                            {
                                text: "Estaremos a la espera de su comunicación o visita.",
                            },
                        ], { spacingAfter: 12 }),
                        (0, docx_2.createParagraph)([
                            {
                                text: "Atentamente,",
                            },
                        ], { spacingAfter: 12 }),
                    ],
                },
            ],
        });
        docx_1.Packer.toBuffer(doc).then((buffer) => {
            fs_1.default.writeFileSync("My Document.docx", buffer);
        });
        res.json({});
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendWeeklyReportsByEmail = exports.deleteDownloadFolderTask = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const document_service_1 = __importDefault(require("../app/customers/services/document.service"));
const customer_service_1 = __importDefault(require("../app/customers/services/customer.service"));
const template_service_1 = __importDefault(require("../app/customers/services/template.service"));
const customer_user_service_1 = __importDefault(require("../app/customers/services/customer-user.service"));
const helpers_1 = require("../libs/helpers");
const nodemailer = __importStar(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const serviceDocument = new document_service_1.default();
const serviceTemplate = new template_service_1.default();
const serviceCustomer = new customer_service_1.default();
const serviceCustomerUser = new customer_user_service_1.default();
const deleteDownloadFolderTask = () => {
    node_cron_1.default.schedule("30 * * * *", function () {
        fs_1.default.rmdir(path_1.default.join(__dirname, "../public/download"), { recursive: true }, (e) => {
            if (e)
                return;
            fs_1.default.mkdir(path_1.default.join(__dirname, "../public/download"), (e) => { });
        });
    });
};
exports.deleteDownloadFolderTask = deleteDownloadFolderTask;
const sendWeeklyReportsByEmail = () => {
    node_cron_1.default.schedule("0 8 * * 1", () => __awaiter(void 0, void 0, void 0, function* () {
        const customers = yield serviceCustomer.find();
        customers.map((customer) => __awaiter(void 0, void 0, void 0, function* () {
            const templates = yield serviceTemplate.findAllByCustomerId(customer.id);
            //encontramos el template para reportes
            const template = templates.find((temp) => temp.dataValues.name.includes("REPORTE"));
            if (template) {
                const customersUser = yield serviceCustomerUser.findAllByCustomerID(customer.id);
                customersUser
                    .filter((customerUser) => customerUser.dataValues.privilege === "LECTOR")
                    .map((customerUser) => __awaiter(void 0, void 0, void 0, function* () {
                    //Generando reporte
                    const doc = yield serviceDocument.generateReport(template.dataValues, customerUser.dataValues.id);
                    //Guardandolo
                    const document = yield (0, helpers_1.saveWordDocument)(doc, template.dataValues.name);
                    //Empezando a crear objeto de nodemailer
                    const transport = nodemailer.createTransport({
                        host: config_1.default.AWS_EMAIL_HOST,
                        port: 465,
                        secure: true,
                        auth: {
                            user: config_1.default.AWS_EMAIL_USER,
                            pass: config_1.default.AWS_EMAIL_PASSWORD,
                        },
                    });
                    //Archivo generado anteriormente
                    const fileContent = fs_1.default.readFileSync(path_1.default.join(__dirname, "../public/download", document));
                    //Cuerpo del email
                    const message = {
                        from: config_1.default.AWS_EMAIL,
                        to: customerUser.dataValues.email,
                        subject: "Reporte de Actividades",
                        text: "El archivo en word adjuntado contiene información relevante sobre la actividad realizada.",
                        attachments: [
                            {
                                filename: "Reporte.docx",
                                content: fileContent,
                                contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            },
                        ],
                    };
                    //Enviar email
                    transport.sendMail(message, (error, info) => {
                        console.log(error);
                        console.log(info);
                    });
                }));
                customersUser
                    .filter((customerUser) => customerUser.dataValues.privilege === "EDITOR")
                    .map((customerUser) => __awaiter(void 0, void 0, void 0, function* () {
                    const doc = yield serviceDocument.generateReport(template.dataValues);
                    const document = yield (0, helpers_1.saveWordDocument)(doc, template.dataValues.name);
                    //Empezando a crear objeto de nodemailer
                    const transport = nodemailer.createTransport({
                        host: config_1.default.AWS_EMAIL_HOST,
                        port: 465,
                        secure: true,
                        auth: {
                            user: config_1.default.AWS_EMAIL_USER,
                            pass: config_1.default.AWS_EMAIL_PASSWORD,
                        },
                    });
                    //Archivo generado anteriormente
                    const fileContent = fs_1.default.readFileSync(path_1.default.join(__dirname, "../public/download", document));
                    //Cuerpo del email
                    const message = {
                        from: config_1.default.AWS_EMAIL,
                        to: customerUser.dataValues.email,
                        subject: "Reporte de Actividades",
                        text: "El archivo en word adjuntado contiene información relevante sobre la actividad realizada.",
                        attachments: [
                            {
                                filename: "Reporte.docx",
                                content: fileContent,
                                contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            },
                        ],
                    };
                    //Enviar email
                    transport.sendMail(message, (error, info) => {
                        console.log(error);
                        console.log(info);
                    });
                }));
            }
        }));
    }), { timezone: "America/Lima" });
};
exports.sendWeeklyReportsByEmail = sendWeeklyReportsByEmail;
//8:00 am Cada Lunes
//0 8 * * 1

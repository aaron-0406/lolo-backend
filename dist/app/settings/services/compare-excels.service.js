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
const exceljs_1 = require("exceljs");
const compare_excels_util_1 = require("../../../utils/config/compare-excels.util");
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const nodemailer = __importStar(require("nodemailer"));
class CompareExcelsService {
    constructor() {
        this.getSortingAndData = (pathname) => __awaiter(this, void 0, void 0, function* () {
            const workbook = new exceljs_1.Workbook();
            const readWorkbook = yield workbook.xlsx.readFile(pathname);
            let data = [];
            const orderData = {};
            if (workbook.worksheets.length) {
                const sheetIds = [];
                workbook.eachSheet((_, index) => {
                    sheetIds.push(index);
                });
                sheetIds.forEach((id) => {
                    var _a;
                    const worksheet = readWorkbook.getWorksheet(id);
                    const headersValues = (_a = worksheet === null || worksheet === void 0 ? void 0 : worksheet.getRow(1)) === null || _a === void 0 ? void 0 : _a.values;
                    if (headersValues && Array.isArray(headersValues) && headersValues.length > 0) {
                        const headersAreValid = compare_excels_util_1.headers.every((header) => headersValues.includes(header.trim()));
                        if (!headersAreValid) {
                            // throw new Error(`Las cabeceras de la hoja ${id} no son válidas`);
                        }
                        else {
                            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                                if (rowNumber > 1) {
                                    const rowData = [];
                                    row.eachCell({ includeEmpty: true }, (cell) => {
                                        rowData.push(cell.value);
                                    });
                                    if (rowData.length) {
                                        const dataRow = {
                                            idc: parseInt(rowData[0]),
                                            codCuentaCobranza: rowData[1],
                                            nombreCliente: rowData[2]
                                                ? rowData[2]
                                                : "NO REGISTRADO",
                                            estadoCartera: rowData[3] ? (0, compare_excels_util_1.modifyString)(rowData[3]).trim() : "SIN CLASIFICACIÓN (CUENTA CORRIENTE)",
                                        };
                                        if (dataRow.codCuentaCobranza.trim() !== '') {
                                            data.push(dataRow);
                                        }
                                    }
                                }
                            });
                            data.forEach((data) => {
                                if (orderData[data.idc]) {
                                    orderData[data.idc].push(data);
                                }
                                else {
                                    orderData[data.idc] = [data];
                                }
                            });
                        }
                    }
                });
                return {
                    data,
                    orderData
                };
            }
        });
        this.compareExcels = (prevFile, newFile) => __awaiter(this, void 0, void 0, function* () {
            const prevFileName = prevFile.filename;
            const newFileName = newFile.filename;
            const prevFilePath = path.join(__dirname, "../../../docs", prevFileName);
            const newFilePath = path.join(__dirname, "../../../docs", newFileName);
            const prevData = yield this.getSortingAndData(prevFilePath);
            const newData = yield this.getSortingAndData(newFilePath);
            const data1 = prevData === null || prevData === void 0 ? void 0 : prevData.data;
            const data2 = newData === null || newData === void 0 ? void 0 : newData.data;
            const orderData1 = prevData === null || prevData === void 0 ? void 0 : prevData.orderData;
            const orderData2 = newData === null || newData === void 0 ? void 0 : newData.orderData;
            const orderData1Keys = Object.keys(prevData === null || prevData === void 0 ? void 0 : prevData.orderData);
            const orderData2Keys = Object.keys(newData === null || newData === void 0 ? void 0 : newData.orderData);
            let newClients = [];
            let deletedClients = [];
            orderData2Keys.forEach((key) => {
                if (!orderData1Keys.includes(key)) {
                    newClients.push({
                        idc: orderData2[key][0].idc,
                        nombreCliente: orderData2[key][0].nombreCliente,
                    });
                }
            });
            orderData1Keys.forEach((key) => {
                if (!orderData2Keys.includes(key)) {
                    deletedClients.push({
                        idc: orderData1[key][0].idc,
                        nombreCliente: orderData1[key][0].nombreCliente,
                    });
                }
            });
            // ? Uno que muestre si se eliminaron productos
            // ? Uno que muestre si se agregaron nuevos productos
            // ? uno que muestre productos repetidos
            // ? Uno que muestre que productos pasaron de activa a castigo  o viseversa
            let deletedProducts = [];
            let newProducts = [];
            let unchangedProducts = [];
            let repeatedProducts = [];
            const productsChangedStatusToPenalty = [];
            const productsChangedStatusToActive = [];
            const productsWithoutStatus = [];
            const dontRepeatData1 = (0, compare_excels_util_1.removeDuplicates)(data1, 'codCuentaCobranza');
            const dontRepeatData2 = (0, compare_excels_util_1.removeDuplicates)(data2, 'codCuentaCobranza');
            dontRepeatData1.forEach((product) => {
                if (!dontRepeatData2.some((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim())) {
                    deletedProducts.push(product);
                }
            });
            dontRepeatData2.forEach((product) => {
                if (!dontRepeatData1.some((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim())) {
                    newProducts.push(product);
                }
            });
            dontRepeatData2.forEach((product) => {
                if (dontRepeatData1.some((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim())) {
                    unchangedProducts.push(product);
                }
            });
            data2.forEach((product) => {
                if (data2.filter((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim()).length > 1) {
                    repeatedProducts.push(product);
                }
            });
            unchangedProducts.forEach((product) => {
                const productInData1 = data1.find((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim());
                if (productInData1) {
                    if (product.estadoCartera === compare_excels_util_1.filters.PENALTY &&
                        productInData1.estadoCartera === compare_excels_util_1.filters.ACTIVE) {
                        productsChangedStatusToPenalty.push(Object.assign(Object.assign({}, productInData1), { status: product.estadoCartera }));
                    }
                    else if (product.estadoCartera === compare_excels_util_1.filters.ACTIVE &&
                        productInData1.estadoCartera === compare_excels_util_1.filters.PENALTY) {
                        productsChangedStatusToActive.push(Object.assign(Object.assign({}, productInData1), { status: product.estadoCartera }));
                    }
                }
            });
            dontRepeatData2.forEach((product) => {
                if (product.estadoCartera === compare_excels_util_1.filters.ACTIVE_WITHOUT_STATUS) {
                    productsWithoutStatus.push(product);
                }
            });
            const result = {
                newClients,
                deletedClients,
                deletedProducts,
                newProducts,
                unchangedProducts,
                repeatedProducts,
                productsChangedStatusToPenalty,
                productsChangedStatusToActive,
                productsWithoutStatus,
            };
            const fileData = (0, compare_excels_util_1.generateExcelReport)(result);
            return fileData;
        });
        this.sendReportByEmail = (data) => __awaiter(this, void 0, void 0, function* () {
            const reportPath = path.join(__dirname, '../../../public/download/compare-excels', data.fileData.fileName);
            const fileData = fs_1.default.readFileSync(reportPath);
            const transport = nodemailer.createTransport({
                // host: config.AWS_EMAIL_HOST,
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: 'yvaxqjaesko7klvx@ethereal.email',
                    pass: 'W31TrqCz3qbvDtdjUZ',
                    // user: config.AWS_EMAIL_USER,
                    // pass: config.AWS_EMAIL_PASSWORD,
                },
            });
            const emails = data.users.map((user) => user.email);
            const mailOptions = {
                // from: config.AWS_EMAIL_USER,
                to: emails.join(', '),
                subject: 'Reporte de comparación de excels',
                text: 'Reporte de comparación de excels',
                attachments: [
                    {
                        filename: data.fileData.fileName,
                        content: fileData,
                    },
                ],
            };
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    const previewUrl = nodemailer.getTestMessageUrl(info);
                    console.log('Preview URL: %s', previewUrl);
                    console.log('Email sent: ' + info.response);
                }
            });
            // {
            //   user: 'yvaxqjaesko7klvx@ethereal.email',
            //   pass: 'W31TrqCz3qbvDtdjUZ',
            //   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
            //   imap: { host: 'imap.ethereal.email', port: 993, secure: true },
            //   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
            //   web: 'https://ethereal.email'
            // }
        });
    }
}
exports.default = CompareExcelsService;

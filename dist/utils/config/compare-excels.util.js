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
exports.generateExcelReport = exports.headers = exports.filters = exports.modifyString = exports.removeDuplicates = void 0;
const path_1 = __importDefault(require("path"));
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
const headers = ['IDC', 'CODCUENTACOBRANZA', 'NOMBRECLIENTE', 'ESTADO_CARTERA'];
exports.headers = headers;
const patternActivA = /\bACTIVA\b/;
const patternActiv = /\bACTIV\b/;
const filters = {
    ACTIVE: 'ACTIVO',
    PENALTY: 'CASTIGO',
    ACTIVE_WITHOUT_STATUS: 'SIN CLASIFICACIÓN (CUENTA CORRIENTE)',
};
exports.filters = filters;
const removeDuplicates = (list, attribute) => {
    const seen = new Set();
    return list.filter(item => {
        const value = item[attribute];
        if (seen.has(value)) {
            return false;
        }
        else {
            seen.add(value);
            return true;
        }
    });
};
exports.removeDuplicates = removeDuplicates;
const modifyString = (s) => {
    if (patternActivA.test(s)) {
        return s.replace(patternActivA, "ACTIVO");
    }
    else if (patternActiv.test(s)) {
        return s + "o";
    }
    return s;
};
exports.modifyString = modifyString;
const generateExcelReport = (result) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkbook = new exceljs_1.default.Workbook();
    newWorkbook.description = 'Reporte de comparación de Excel';
    newWorkbook.creator = 'Javier';
    newWorkbook.created = new Date();
    const fileName = 'reporte.xlsx';
    const newClientsWorksheet = newWorkbook.addWorksheet('CLIENTES NUEVOS');
    const removedClientsWorksheet = newWorkbook.addWorksheet('CLIENTES REMOVIDOS');
    const newProductsWorksheet = newWorkbook.addWorksheet('PRODUCTOS NUEVOS');
    const removedProductsWorksheet = newWorkbook.addWorksheet('PRODUCTOS REMOVIDOS');
    const activeToPenaltyWorksheet = newWorkbook.addWorksheet('ACTIVO A CASTIGO');
    const penaltyToActiveWorksheet = newWorkbook.addWorksheet('CASTIGO A ACTIVO');
    const withoutStatusWorksheet = newWorkbook.addWorksheet('SIN CLASIFICAR');
    newClientsWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
    ];
    removedClientsWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
    ];
    newProductsWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'CODCUENTACOBRANZA', key: 'codCuentaCobranza', width: 32 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
        { header: 'ESTADO DE CARTERA', key: 'estadoCartera', width: 32 },
    ];
    removedProductsWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'CODCUENTACOBRANZA', key: 'codCuentaCobranza', width: 32 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
        { header: 'ESTADO DE CARTERA', key: 'estadoCartera', width: 32 },
    ];
    activeToPenaltyWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'CODCUENTACOBRANZA', key: 'codCuentaCobranza', width: 32 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
        { header: 'ORIGINAL ESTADO', key: 'estadoCartera', width: 32 },
        { header: 'NUEVO ESTADO', key: 'status', width: 32 },
    ];
    penaltyToActiveWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'CODCUENTACOBRANZA', key: 'codCuentaCobranza', width: 32 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
        { header: 'ORIGINAL ESTADO', key: 'estadoCartera', width: 32 },
        { header: 'NUEVO ESTADO', key: 'status', width: 32 },
    ];
    withoutStatusWorksheet.columns = [
        { header: 'IDC', key: 'idc', width: 20 },
        { header: 'CODCUENTACOBRANZA', key: 'codCuentaCobranza', width: 32 },
        { header: 'NOMBRE DEL CLIENTE', key: 'nombreCliente', width: 50 },
        { header: 'ESTADO DECARTERA', key: 'estadoCartera', width: 32 },
    ];
    result.newClients.forEach((client) => {
        newClientsWorksheet.addRow(client);
    });
    newClientsWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = newClientsWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    newClientsWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    result.deletedClients.forEach((client) => {
        removedClientsWorksheet.addRow(client);
    });
    removedClientsWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = removedClientsWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    removedClientsWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    result.newProducts.forEach((product) => {
        newProductsWorksheet.addRow(product);
    });
    newProductsWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = newProductsWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    newProductsWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    result.deletedProducts.forEach((product) => {
        removedProductsWorksheet.addRow(product);
    });
    removedProductsWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = removedProductsWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    removedProductsWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    result.productsChangedStatusToPenalty.forEach((product) => {
        activeToPenaltyWorksheet.addRow(product);
    });
    activeToPenaltyWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = activeToPenaltyWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    activeToPenaltyWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    result.productsChangedStatusToActive.forEach((product) => {
        penaltyToActiveWorksheet.addRow(product);
    });
    penaltyToActiveWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = penaltyToActiveWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    penaltyToActiveWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    result.productsWithoutStatus.forEach((product) => {
        withoutStatusWorksheet.addRow(product);
    });
    withoutStatusWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            let idcCell = withoutStatusWorksheet.getCell(`A${rowNumber}`);
            cell.font = { name: 'Calibri' };
            idcCell.alignment = { horizontal: 'center' };
            if (rowNumber % 2 === 0) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' }
                };
            }
            else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'DAE1F2' }
                };
            }
        });
    });
    withoutStatusWorksheet.getRow(1).eachCell((cell) => {
        cell.style = {
            font: { bold: true, color: { argb: 'FFFFFF' }, name: 'Calibri' },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4472C4" },
                bgColor: { argb: "4472C4" },
            },
            alignment: { horizontal: 'center' },
        };
    });
    fs_1.default.mkdirSync(path_1.default.join(__dirname, '../../public/download/compare-excels'), { recursive: true });
    const reportPath = path_1.default.join(__dirname, '../../public/download/compare-excels', fileName);
    yield newWorkbook.xlsx.writeFile(reportPath);
    const stats = fs_1.default.statSync(reportPath);
    const fileSize = stats.size;
    return {
        fileName,
        fileSize
    };
});
exports.generateExcelReport = generateExcelReport;

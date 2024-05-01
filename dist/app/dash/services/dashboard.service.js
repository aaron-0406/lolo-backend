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
const exceljs_1 = require("exceljs");
const path_1 = __importDefault(require("path"));
class DashboardService {
    static readExcel(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new exceljs_1.Workbook();
            yield workbook.xlsx.readFile(file);
            if (workbook.worksheets.length < 1)
                throw new Error("No se encontraron hojas de trabajo en el archivo Excel");
            let sheetIds = [];
            workbook.eachSheet((sheet, id) => (sheetIds = [...sheetIds, id]));
            const worksheet = workbook.getWorksheet(sheetIds[0]);
            let products = [];
            worksheet.eachRow({ includeEmpty: true }, (row, index) => {
                row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                    if (cell.value === null || cell.value === undefined)
                        cell.value = "";
                });
                let file = row.values;
                products = [
                    ...products,
                    {
                        id: -1,
                        clientId: Number(`${file[1]}`),
                        funcionarioId: `${file[29]}`,
                        cityId: `${file[32]}`,
                        code: `${file[2]}`,
                        clientName: `${file[3]}`,
                        state: `${file[8]}`,
                        customerId: -1,
                        negotiationId: -1,
                        customerHasBankId: -1,
                        extProductNameId: -1,
                        judicialCaseFileId: -1,
                    },
                ];
            });
            products.shift();
            return products;
        });
    }
    static createExcel(setting) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new exceljs_1.Workbook();
            setting.map((item) => {
                const worksheet = workbook.addWorksheet(item.workSheetName);
                const titleRow = worksheet.addRow(item.rowTitles);
                titleRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.style = {
                        fill: {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "4472C4" },
                        },
                        font: {
                            bold: true,
                            color: { argb: "FFFFFF" },
                        },
                    };
                });
                item.rowData.map((data, index) => {
                    const row = worksheet.addRow(data);
                    row.eachCell({ includeEmpty: true }, (cell) => {
                        cell.style = {
                            fill: {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: index % 2 === 0 ? "D9E1F2" : "FFFFFF" },
                            },
                        };
                    });
                });
                worksheet.columns.forEach((column, index) => {
                    if (column.eachCell) {
                        column.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                            const desiredWidth = Math.max(column.width ? column.width : 0, cell.value ? cell.value.toString().length + 5 : 10);
                            column.width = desiredWidth;
                        });
                    }
                });
            });
            const pathname = path_1.default.join(__dirname, "../../../docs/Archivo.xlsx");
            yield workbook.xlsx.writeFile(pathname);
            return pathname;
        });
    }
}
exports.default = DashboardService;

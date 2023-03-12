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
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
class DashboardService {
    static readExcel(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new exceljs_1.Workbook();
            yield workbook.xlsx.readFile(file);
            if (workbook.worksheets.length < 1) {
                throw new Error("No se encontraron hojas de trabajo en el archivo Excel");
            }
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
                        id: `${file[1]}`,
                        code: `${file[2]}`,
                        name: `${file[3]}`,
                        state: `${file[8]}`,
                    },
                ];
            });
            products.shift();
            return products;
        });
    }
}
exports.default = DashboardService;

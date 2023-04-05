import { Workbook, CellValue } from "exceljs";
import { ProductTypeName } from "../../customers/types/product.tyoe";
import path from "path";

export type CreateExcelType = {
  workSheetName: string;
  rowTitles: string[];
  rowData: Array<string[]>;
};

class DashboardService {
  public static async readExcel(file: string): Promise<ProductTypeName[]> {
    const workbook = new Workbook();
    await workbook.xlsx.readFile(file);
    if (workbook.worksheets.length < 1)
      throw new Error("No se encontraron hojas de trabajo en el archivo Excel");
    let sheetIds: number[] = [];
    workbook.eachSheet((sheet, id) => (sheetIds = [...sheetIds, id]));
    const worksheet = workbook.getWorksheet(sheetIds[0]);
    let products: ProductTypeName[] = [];
    worksheet.eachRow({ includeEmpty: true }, (row, index) => {
      row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        if (cell.value === null || cell.value === undefined) cell.value = "";
      });
      let file = row.values as CellValue[];
      products = [
        ...products,
        {
          id: -1,
          clientCode: `${file[1]}`,
          name: `${file[37]}`,
          funcionarioId: `${file[29]}`,
          cityId: `${file[32]}`,
          code: `${file[2]}`,
          clientName: `${file[3]}`,
          state: `${file[8]}`,
          customerId: -1,
        },
      ];
    });
    products.shift();
    return products;
  }

  public static async createExcel(setting: CreateExcelType[]) {
    const workbook = new Workbook();
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
            const desiredWidth = Math.max(
              column.width ? column.width : 0,
              cell.value ? cell.value.toString().length + 5 : 10
            );
            column.width = desiredWidth;
          });
        }
      });
    });
    const pathname = path.join(__dirname, "../../../docs/Archivo.xlsx");
    await workbook.xlsx.writeFile(pathname);
    return pathname;
  }
}

export default DashboardService;

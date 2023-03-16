import { Workbook, CellValue } from "exceljs";
import { ProductTypeName } from "../../customers/types/product.tyoe";

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
}

export default DashboardService;

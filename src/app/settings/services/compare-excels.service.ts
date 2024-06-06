import { Workbook } from "exceljs";
import { Data } from "../types/compare-excels.type";
import { modifyString, removeDuplicates, filters, headers, generateExcelReport } from "../../../utils/config/compare-excels.util";
import { Client, Product, ProductWithStatus, DataResult } from "../types/compare-excels.type";
import * as path from 'path';


class CompareExcelsService {
  constructor(){}

  getSortingAndData = async(pathname: string) => {
    const workbook = new Workbook();
    const readWorkbook = await workbook.xlsx.readFile(pathname);
    let data:Data[] = [];
    const orderData: { [key:string] : Data[] } = {};

    if (workbook.worksheets.length) {
      const sheetIds: number[] = [];
      workbook.eachSheet((_, index) => {
        sheetIds.push(index);
      });
      sheetIds.forEach((id) => {
        const worksheet = readWorkbook.getWorksheet(id);
        const headersValues = worksheet?.getRow(1)?.values;
        if (headersValues && Array.isArray(headersValues) && headersValues.length > 0) {
          const headersAreValid = headers.every((header) =>
            headersValues.includes(header.trim())
          );
          if (!headersAreValid) {
            // throw new Error(`Las cabeceras de la hoja ${id} no son válidas`);
          }else{
            worksheet.eachRow({ includeEmpty: true },(row, rowNumber) => {
              if (rowNumber > 1) {
                const rowData: string[] = [];
                row.eachCell({ includeEmpty: true }, (cell) => {
                  rowData.push(cell.value as string);
                });
                if (rowData.length) {
                  const dataRow: Data = {
                    idc: parseInt(rowData[0]),
                    codCuentaCobranza: rowData[1] as string,
                    nombreCliente: rowData[2]
                      ? (rowData[2] as string)
                      : "NO REGISTRADO",
                    estadoCartera: rowData[3] ? modifyString(rowData[3]).trim() as string : "SIN CLASIFICACIÓN (CUENTA CORRIENTE)",
                  };
                  if (dataRow.codCuentaCobranza.trim() !== '') {
                    data.push(dataRow);
                  }
                }
              }
            })

            data.forEach((data)=>{
              if(orderData[data.idc]){
                orderData[data.idc].push(data);
              }else{
                orderData[data.idc] = [data];
              }
            })
          }
        }
      })

      return {
        data,
        orderData
      };
    }
  }



  compareExcels = async (prevFile: Express.Multer.File, newFile: Express.Multer.File) => {
    const prevFileName = prevFile.filename;
    const newFileName = newFile.filename;

    const prevFilePath = path.join(__dirname, "../../../docs", prevFileName);
    const newFilePath = path.join(__dirname, "../../../docs", newFileName);

    const prevData = await this.getSortingAndData(prevFilePath);
    const newData = await this.getSortingAndData(newFilePath);
    const data1 = prevData?.data!;
    const data2 = newData?.data!;

    console.log(data1.length);
    console.log(data2.length);

    const orderData1 = prevData?.orderData!;
    const orderData2 = newData?.orderData!;
    const orderData1Keys = Object.keys(prevData?.orderData!);
    const orderData2Keys = Object.keys(newData?.orderData!);
    let newClients: Client[] = [];
    let deletedClients: Client[] = [];

    orderData2Keys.forEach((key: string) => {
      if (!orderData1Keys.includes(key)) {
        newClients.push({
          idc: orderData2[key][0].idc,
          nombreCliente: orderData2[key][0].nombreCliente,
        });
      }
    });

    orderData1Keys.forEach((key: string) => {
      if (!orderData2Keys.includes(key)) {
        deletedClients.push({
          idc: orderData1[key][0].idc,
          nombreCliente: orderData1[key][0].nombreCliente,
        });
      }
    })

    // ? Uno que muestre si se eliminaron productos
    // ? Uno que muestre si se agregaron nuevos productos
    // ? uno que muestre productos repetidos
    // ? Uno que muestre que productos pasaron de activa a castigo  o viseversa

    let deletedProducts: Product[] = [];
    let newProducts: Product[] = [];
    let unchangedProducts: Product[] = [];
    let repeatedProducts: Product[] = [];


    const productsChangedStatusToPenalty: ProductWithStatus[] = [];
    const productsChangedStatusToActive: ProductWithStatus[] = [];
    const productsWithoutStatus: Product[] = [];

    const dontRepeatData1 =  removeDuplicates(data1, 'codCuentaCobranza');
    const dontRepeatData2 =  removeDuplicates(data2, 'codCuentaCobranza');


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
      if(data2.filter((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim()).length > 1) {
        repeatedProducts.push(product);
      }
    });



    unchangedProducts.forEach((product) => {
      const productInData1 = data1.find((data) => data.codCuentaCobranza.trim() === product.codCuentaCobranza.trim());
      if (productInData1) {
        if (
          product.estadoCartera === filters.PENALTY &&
          productInData1.estadoCartera === filters.ACTIVE
        ) {
          productsChangedStatusToPenalty.push({
            ...productInData1,
            status: product.estadoCartera,
          });
        } else if (
          product.estadoCartera === filters.ACTIVE &&
          productInData1.estadoCartera === filters.PENALTY
        ) {
          productsChangedStatusToActive.push({
            ...productInData1,
            status: product.estadoCartera,
          });
        }
      }
    });

    dontRepeatData2.forEach((product) => {
      if (product.estadoCartera === filters.ACTIVE_WITHOUT_STATUS) {
        productsWithoutStatus.push(product);
      }
    });

    const result: DataResult = {
      newClients,
      deletedClients,
      deletedProducts,
      newProducts,
      unchangedProducts,
      repeatedProducts,
      productsChangedStatusToPenalty,
      productsChangedStatusToActive,
      productsWithoutStatus,
    }

    const pathDownload = generateExcelReport(result);
    return pathDownload;
  }
}

export default CompareExcelsService;
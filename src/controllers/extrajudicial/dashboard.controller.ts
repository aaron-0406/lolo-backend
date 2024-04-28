import { Request, Response, NextFunction } from "express";
import * as nodemailer from "nodemailer";
import boom from "@hapi/boom";
import * as fs from "fs";
import path from "path";
import DashboardService, {
  CreateExcelType,
} from "../../app/dash/services/dashboard.service";
import CustomerUserService from "../../app/dash/services/customer-user.service";
import ClientService from "../../app/extrajudicial/services/client.service";
import ProductService from "../../app/extrajudicial/services/product.service";
import config from "../../config/config";

const productService = new ProductService();
const clientService = new ClientService();
const customerUserService = new CustomerUserService();

import {
  ProductTypeName,
  ProductType,
} from "../../app/extrajudicial/types/product.tyoe";
import { ClientType } from "../../app/extrajudicial/types/client.type";

export const readXslxController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file, customerId } = req.body;
    const productsXlsx = await DashboardService.readExcel(
      path.join(__dirname, "../../docs", `${file}`)
    );
    const products = await productService.getAllByCustomerId(customerId);
    const clients = await clientService.findAllByCustomerId(customerId);

    const clientsAdded: ProductTypeName[] = productsXlsx
      .filter((product) => !clients.some((c) => c.id === product.clientId))
      .filter(
        (client, index, arr) =>
          arr.findIndex((t) => t.clientId === client.clientId) === index
      )
      .sort((a, b) => a.clientName.localeCompare(b.clientName));

    const clientsDeleted: ClientType[] = clients
      .filter((client) => !productsXlsx.some((c) => c.clientId === client.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    const productsAdded: ProductTypeName[] = productsXlsx
      .filter((product) => !products.some((p) => p.code === product.code))
      .sort((a, b) => a.clientName.localeCompare(b.clientName));

    const productsDeleted: ProductType[] = products
      .filter((product) => !productsXlsx.some((p) => p.code === product.code))
      .sort((a, b) => String(a.clientId).localeCompare(String(b.clientId)));

    const productsCastigo: ProductType[] = products
      .filter((product) => {
        const productFound = productsXlsx.find(
          (obj) => obj.code === product.code
        );
        if (!productFound) return false;
        return productFound.state === "CASTIGO" && product.state === "ACTIVA";
      })
      .sort((a, b) => String(a.clientId).localeCompare(String(b.clientId)));

    res.json({
      clientsAdded,
      clientsDeleted,
      productsAdded,
      productsDeleted,
      productsCastigo,
    });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const createClientsXslxController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clients, customerUserId, customerHasBankId, idBank } = req.body;
    for await (const client of clients) {
      //TODO: Update logic with save service of client service
      /* await clientService.create(
        {
          code: client.code,
          cityId: client.cityId,
          name: client.name,
          funcionarioId: client.funcionarioId,
          customerUserId,
          negotiationId: 17,
          customerHasBankId,
        },
        idBank
      ); */
    }
    res.json({ success: "Cliente agregado" });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const deleteClientsXslxController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clients, customerHasBankId, idBank } = req.body;
    for await (const code of clients) {
      await clientService.delete(code, customerHasBankId, idBank);
    }
    res.json({ success: "Cliente eliminado" });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const createProductsXslxController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { products, customerUserId, customerHasBankId, idBank } = req.body;
    for await (const product of products) {
      const client = await clientService.findByCustomerIdAndCode(
        product.customerId,
        product.clientId
      );
      if (!client) {
        //TODO: Update logic with save service of client service
        /* await clientService.create(
          {
            code: product.clientId,
            cityId: product.cityId,
            name: product.clientName,
            funcionarioId: product.funcionarioId,
            customerUserId,
            negotiationId: 17,
            customerHasBankId,
          },
          idBank
        ); */
      }
      await productService.create({
        code: product.code,
        customerId: product.customerId,
        state: product.state,
        negotiationId: product.negotiationId,
        customerHasBankId: product.customerHasBankId,
        clientId: product.clientId,
        extProductNameId: product.extProductNameId,
      });
    }
    res.json({ success: "Producto agregado" });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const deleteProductsXslxController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { products } = req.body;
    console.log(products);
    for await (const code of products) {
      await productService.deleteByCode(code);
    }
    res.json({ success: "Producto eliminado" });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

export const sendXslxController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      usersId,
      clientsAdded,
      clientsDeleted,
      productsAdded,
      productsCastigo,
      productsDeleted,
    } = req.body;

    const configExcel: CreateExcelType[] = [
      {
        rowTitles: ["CODIGO CLIENTE", "NOMBRE"],
        workSheetName: "CLIENTES AGREGADOS",
        rowData: clientsAdded.map((item: ProductTypeName) => {
          return [item.clientId, item.clientName];
        }),
      },
      {
        rowTitles: ["CODIGO CLIENTE", "NOMBRE"],
        workSheetName: "CLIENTES ELIMINADOS",
        rowData: clientsDeleted.map((item: ClientType) => {
          return [item.code, item.name];
        }),
      },
      {
        rowTitles: [
          "CODIGO CLIENTE",
          "NOMBRE CLIENTE",
          "CÓDIGO PRODUCTO",
          "NOMBRE PRODUCTO",
          "ESTADO",
        ],
        workSheetName: "PRODUCTOS AGREGADOS",
        rowData: productsAdded.map((item: ProductTypeName) => {
          return [item.clientId, item.clientName, item.code, item.state];
        }),
      },
      {
        rowTitles: ["CODIGO CLIENTE", "CODIGO PRODUCTO", "NOMBRE PRODUCTO"],
        workSheetName: "PRODUCTOS ELIMINADOS",
        rowData: productsDeleted.map((item: ProductType) => {
          return [item.clientId, item.code];
        }),
      },
      {
        rowTitles: [
          "CODIGO CLIENTE",
          "CODIGO PRODUCTO",
          "NOMBRE PRODUCTO",
          "ESTADO",
        ],
        workSheetName: "PRODUCTOS CASTIGO",
        rowData: productsCastigo.map((item: ProductType) => {
          return [item.clientId, item.code, item.state];
        }),
      },
    ];
    const excel = await DashboardService.createExcel(configExcel);
    const fileContent = fs.readFileSync(excel);
    const transport = nodemailer.createTransport({
      host: config.AWS_EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: config.AWS_EMAIL_USER,
        pass: config.AWS_EMAIL_PASSWORD,
      },
    });

    for (const id of usersId) {
      const user = await customerUserService.findOne(id);
      const message = {
        from: config.AWS_EMAIL,
        to: user.dataValues.email,
        subject: "Reporte en Excel sobre el portafolio de clientes",
        text: "El archivo en excel adjuntado contiene información relevante sobre la gestión para los clientes.",
        attachments: [
          {
            filename: "Archivo.xlsx",
            content: fileContent,
            contentType: "application/vnd.ms-excel",
          },
        ],
      };
      transport.sendMail(message, (error, info) => {
        console.log(error);
        console.log(info);
      });
    }
    return res.json({ success: "Email enviado" });
  } catch (error: any) {
    next(boom.badRequest(error.message));
  }
};

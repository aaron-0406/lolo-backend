import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import boom from "@hapi/boom";
import { archivosExcel } from "../middlewares/multer.handler";
import validatorHandler from "../middlewares/validator.handler";
import {
  createClientsSchema,
  createProductSchema,
  deleteClientsSchema,
  deleteProductSchema,
  excelFileSchema,
} from "../app/boss/schemas/dashboard.schema";
import DashboardService from "../app/boss/services/dashboard.service";
import ProductService from "../app/customers/services/product.service";
import {
  ProductType,
  ProductTypeName,
} from "../app/customers/types/product.tyoe";
import ClientService from "../app/extrajudicial/services/client.service";
import { ClientType } from "../app/extrajudicial/types/client.type";

const router = Router();
const productService = new ProductService();
const clientService = new ClientService();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivosExcel.single("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.post(
  "/xslx",
  multerFile,
  validatorHandler(excelFileSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file, customerId } = req.body;
      const productsXlsx = await DashboardService.readExcel(
        path.join(__dirname, "../docs", `${file}`)
      );
      const products = await productService.getAllByCustomerId(customerId);
      const clients = await clientService.findAllByCustomerId(customerId);

      const clientsAdded: ProductTypeName[] = productsXlsx
        .filter(
          (product) => !clients.some((c) => c.code === product.clientCode)
        )
        .filter(
          (client, index, arr) =>
            arr.findIndex((t) => t.clientCode === client.clientCode) === index
        )
        .sort((a, b) => a.clientName.localeCompare(b.clientName));

      const clientsDeleted: ClientType[] = clients
        .filter(
          (client) => !productsXlsx.some((c) => c.clientCode === client.code)
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      const productsAdded: ProductTypeName[] = productsXlsx
        .filter((product) => !products.some((p) => p.code === product.code))
        .sort((a, b) => a.clientName.localeCompare(b.clientName));

      const productsDeleted: ProductType[] = products
        .filter((product) => !productsXlsx.some((p) => p.code === product.code))
        .sort((a, b) =>
          String(a.clientCode).localeCompare(String(b.clientCode))
        );

      const productsCastigo: ProductType[] = products
        .filter((product) => {
          const productFound = productsXlsx.find(
            (obj) => obj.code === product.code
          );
          if (!productFound) return false;
          return productFound.state === "CASTIGO" && product.state === "ACTIVA";
        })
        .sort((a, b) =>
          String(a.clientCode).localeCompare(String(b.clientCode))
        );

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
  }
);

router.post(
  "/clients",
  validatorHandler(createClientsSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clients, customerUserId, customerHasBankId, idBank } = req.body;
      for await (const client of clients) {
        await clientService.create(
          {
            code: client.code,
            cityId: 1,
            name: client.name,
            funcionarioId: 1,
            customerUserId,
            negotiationId: 1,
            customerHasBankId,
          },
          idBank
        );
      }
      res.json({ success: "Cliente agregado" });
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.post(
  "/delete-clients",
  validatorHandler(deleteClientsSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clients, customerHasBankId, idBank } = req.body;
      for await (const code of clients) {
        await clientService.delete(code, customerHasBankId, idBank);
      }
      res.json({ success: "Cliente eliminado" });
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.post(
  "/products",
  validatorHandler(createProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { products, customerUserId, customerHasBankId, idBank } = req.body;
      for await (const product of products) {
        const client = await clientService.findByCustomerIdAndCode(
          product.customerId,
          product.clientCode
        );
        if (!client) {
          await clientService.create(
            {
              code: product.clientCode,
              cityId: 1,
              name: product.clientName,
              funcionarioId: 1,
              customerUserId,
              negotiationId: 1,
              customerHasBankId,
            },
            idBank
          );
        }
        await productService.create({
          code: product.code,
          clientCode: product.clientCode,
          customerId: product.customerId,
          name: product.name,
          state: product.state,
        });
      }
      res.json({ success: "Producto agregado" });
    } catch (error: any) {
      next(boom.badRequest(error.message));
    }
  }
);

router.post(
  "/delete-products",
  validatorHandler(deleteProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export default router;

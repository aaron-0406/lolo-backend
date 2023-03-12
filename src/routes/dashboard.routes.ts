import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import boom from "@hapi/boom";
import { archivosExcel } from "../middlewares/multer.handler";
import validatorHandler from "../middlewares/validator.handler";
import { excelFileSchema } from "../app/boss/schemas/dashboard.schema";
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

      let clientsAdded: ProductTypeName[] = productsXlsx
        .filter(
          (product) => !clients.some((c) => c.code === product.clientCode)
        )
        .filter(
          (client, index, arr) =>
            arr.findIndex((t) => t.clientCode === client.clientCode) === index
        )
        .sort((a, b) => a.clientName.localeCompare(b.clientName));

      let clientsDeleted: ClientType[] = clients
        .filter((client) => !productsXlsx.some((c) => c.code === client.code))
        .sort((a, b) => a.name.localeCompare(b.name));

      let productsAdded: ProductTypeName[] = productsXlsx
        .filter((product) => !products.some((p) => p.code === product.code))
        .sort((a, b) => a.clientName.localeCompare(b.clientName));

      let productsDeleted: ProductType[] = products
        .filter((product) => !productsXlsx.some((p) => p.code === product.code))
        .sort((a, b) =>
          String(a.clientCode).localeCompare(String(b.clientCode))
        );

      let productsCastigo: ProductType[] = products
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

export default router;

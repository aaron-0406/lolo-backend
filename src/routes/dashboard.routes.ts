import { Router, Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import { archivosExcel } from "../middlewares/multer.handler";
import validatorHandler from "../middlewares/validator.handler";
import {
  createClientsSchema,
  createProductSchema,
  deleteClientsSchema,
  deleteProductSchema,
  excelFileSchema,
  sendXlsxEmail,
} from "../app/boss/schemas/dashboard.schema";
import {
  createClientsXslxController,
  createProductsXslxController,
  deleteClientsXslxController,
  deleteProductsXslxController,
  readXslxController,
  sendXslxController,
} from "../controllers/dashboard.controller";

const router = Router();

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
  readXslxController
);

router.post(
  "/clients",
  validatorHandler(createClientsSchema, "body"),
  createClientsXslxController
);

router.post(
  "/delete-clients",
  validatorHandler(deleteClientsSchema, "body"),
  deleteClientsXslxController
);

router.post(
  "/products",
  validatorHandler(createProductSchema, "body"),
  createProductsXslxController
);

router.post(
  "/delete-products",
  validatorHandler(deleteProductSchema, "body"),
  deleteProductsXslxController
);

router.post(
  "/send-xslx",
  validatorHandler(sendXlsxEmail, "body"),
  sendXslxController
);

export default router;

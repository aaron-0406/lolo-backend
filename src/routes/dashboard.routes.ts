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
import { JWTAuth } from "../middlewares/auth.handler";

const router = Router();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivosExcel.single("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.post(
  "/xslx",
  JWTAuth,
  multerFile,
  validatorHandler(excelFileSchema, "body"),
  readXslxController
);

router.post(
  "/clients",
  JWTAuth,
  validatorHandler(createClientsSchema, "body"),
  createClientsXslxController
);

router.post(
  "/delete-clients",
  JWTAuth,
  validatorHandler(deleteClientsSchema, "body"),
  deleteClientsXslxController
);

router.post(
  "/products",
  JWTAuth,
  validatorHandler(createProductSchema, "body"),
  createProductsXslxController
);

router.post(
  "/delete-products",
  JWTAuth,
  validatorHandler(deleteProductSchema, "body"),
  deleteProductsXslxController
);

router.post(
  "/send-xslx",
  JWTAuth,
  validatorHandler(sendXlsxEmail, "body"),
  sendXslxController
);

export default router;

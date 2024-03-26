import express, { Request, Response, NextFunction } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import fileSchema from "../../app/extrajudicial/schemas/file.schema";
import { archivos } from "../../middlewares/multer.handler";
import boom from "@hapi/boom";
import {
  createFileController,
  updateFileController,
  deleteFileController,
  findFileByClientIdController,
  findFileByIdController,
} from "../../controllers/extrajudicial/file.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createFileSchema,
  updateFileSchema,
  deleteFileSchema,
  getFileSchema,
  getFileByIdSchema,
  getFileSchemaQuery,
} = fileSchema;
const router = express.Router();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivos.array("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.get(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-03-05"),
  validatorHandler(getFileSchema, "params"),
  validatorHandler(getFileSchemaQuery, "query"),
  findFileByClientIdController
);

router.get(
  "/single/:idCustomer/:chb/:code/:id",
  JWTAuth,
  checkPermissions("P02-02-03-01"),
  validatorHandler(getFileSchema, "params"),
  findFileByIdController
);

router.post(
  "/:idCustomer/:chb/:code/:id/:tagId",
  JWTAuth,
  checkPermissions("P02-02-03-02"),
  validatorHandler(createFileSchema, "params"),
  multerFile,
  createFileController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P02-02-03-04"),
  validatorHandler(getFileByIdSchema, "params"),
  validatorHandler(updateFileSchema, "body"),
  updateFileController
);

router.delete(
  "/:idCustomer/:chb/:code/:id",
  JWTAuth,
  checkPermissions("P02-02-03-03"),
  validatorHandler(deleteFileSchema, "params"),
  deleteFileController
);

export default router;

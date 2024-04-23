import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import extProductNameSchema from "../../app/extrajudicial/schemas/ext-product-name.schema";
import {
  getExtProductNameController,
  getExtProductNameByCHBController,
  getExtProductNameByIdController,
  createExtProductNameController,
  updateExtProductNameController,
  deleteExtProductNameController,
} from "../../controllers/extrajudicial/ext-product-name.controller";

const {
  createExtProductNameSchema,
  updateExtProductNameSchema,
  getExtProductNameByCHBSchema,
  getExtProductNameByIDSchema,
  getExtProductNameByCHBSchemaQuery,
} = extProductNameSchema;

const router = express.Router();

router.get("/", JWTAuth, getExtProductNameController);

router.get(
  "/all-data-by-chb/:chb",
  JWTAuth,
  checkPermissions("P19-04"),
  validatorHandler(getExtProductNameByCHBSchema, "params"),
  validatorHandler(getExtProductNameByCHBSchemaQuery, "query"),
  getExtProductNameByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getExtProductNameByIDSchema, "params"),
  getExtProductNameByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P19-01"),
  validatorHandler(createExtProductNameSchema, "body"),
  createExtProductNameController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P19-02"),
  validatorHandler(getExtProductNameByIDSchema, "params"),
  validatorHandler(updateExtProductNameSchema, "body"),
  updateExtProductNameController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P19-03"),
  validatorHandler(getExtProductNameByIDSchema, "params"),
  deleteExtProductNameController
);

export default router;

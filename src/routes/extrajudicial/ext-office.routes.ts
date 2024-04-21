import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import officeSchema from "../../app/extrajudicial/schemas/ext-office.schema";
import {
  getOfficesController,
  getOfficesByCityController,
  getOfficeByIdController,
  createOfficeController,
  updateOfficeStateController,
  updateOfficeController,
  deleteOfficeController,
} from "../../controllers/extrajudicial/ext-office.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createOfficeSchema,
  updateOfficeStateSchema,
  updateOfficeSchema,
  getOfficeByIdSchema,
  getOfficesByCustomerIdSchema,
  getOfficesByIdSchema,
  getOfficesByCityIdSchema,
} = officeSchema;
const router = express.Router();

router.get(
  "/id-office/:id/:customerId",
  JWTAuth,
  validatorHandler(getOfficeByIdSchema, "params"),
  getOfficeByIdController
);

router.get(
  "/city/:cityId",
  JWTAuth,
  validatorHandler(getOfficesByCityIdSchema, "params"),
  getOfficesByCityController
);

router.get(
  "/:customerId",
  JWTAuth,
  checkPermissions("P17-05"),
  validatorHandler(getOfficesByCustomerIdSchema, "params"),
  getOfficesController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P17-01"),
  validatorHandler(createOfficeSchema, "body"),
  createOfficeController
);

router.patch(
  "/state/:id/:customerId",
  JWTAuth,
  checkPermissions("P17-02"),
  validatorHandler(getOfficeByIdSchema, "params"),
  validatorHandler(updateOfficeStateSchema, "body"),
  updateOfficeStateController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P17-03"),
  validatorHandler(getOfficesByIdSchema, "params"),
  validatorHandler(updateOfficeSchema, "body"),
  updateOfficeController
);

router.delete(
  "/:id/:customerId",
  JWTAuth,
  checkPermissions("P17-04"),
  validatorHandler(getOfficeByIdSchema, "params"),
  deleteOfficeController
);

export default router;

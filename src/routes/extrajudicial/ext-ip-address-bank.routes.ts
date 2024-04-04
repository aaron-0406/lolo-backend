import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import ipAddressSchema from "../../app/extrajudicial/schemas/ext-ip-address-bank.schema";
import {
  getIpAddressesController,
  getIpAddressByIpController,
  getIpAddressByIdController,
  createIpAddressController,
  updateIpAddressStateController,
  updateIpAddressController,
  deleteIpAddressController,
  getIpAddressesByOfficeController,
} from "../../controllers/extrajudicial/ext-ip-address-bank-controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createIpAddressSchema,
  updateIpAddressStateSchema,
  updateIpAddressSchema,
  getIpAddressByIdSchema,
  getIpAddressByIpSchema,
  getIpAddressesByCustomerIdSchema,
  getIpAddressesByIdSchema,
  getIpAddressesByOfficeSchema,
} = ipAddressSchema;
const router = express.Router();

router.get(
  "/id-address/:id/:customerId",
  JWTAuth,
  validatorHandler(getIpAddressByIdSchema, "params"),
  getIpAddressByIdController
);

router.get(
  "/ip-address/:ip/:customerId",
  JWTAuth,
  validatorHandler(getIpAddressByIpSchema, "params"),
  getIpAddressByIpController
);

router.get(
  "/office/:officeId",
  JWTAuth,
  validatorHandler(getIpAddressesByOfficeSchema, "params"),
  getIpAddressesByOfficeController
);

router.get(
  "/:customerId",
  JWTAuth,
  validatorHandler(getIpAddressesByCustomerIdSchema, "params"),
  getIpAddressesController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P15-01"),
  validatorHandler(createIpAddressSchema, "body"),
  createIpAddressController
);

router.patch(
  "/state/:id/:customerId",
  JWTAuth,
  checkPermissions("P15-02"),
  validatorHandler(getIpAddressByIdSchema, "params"),
  validatorHandler(updateIpAddressStateSchema, "body"),
  updateIpAddressStateController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P15-03"),
  validatorHandler(getIpAddressesByIdSchema, "params"),
  validatorHandler(updateIpAddressSchema, "body"),
  updateIpAddressController
);

router.delete(
  "/:id/:customerId",
  JWTAuth,
  checkPermissions("P15-04"),
  validatorHandler(getIpAddressByIdSchema, "params"),
  deleteIpAddressController
);

export default router;

import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import IpAddressSchema from "../../app/extrajudicial/schemas/ext-ip-address-bank.schema";
import {
  getIpAddressController,
  getIpAddressByIpController,
  getIpAddressByIdController,
  createIpAddressController,
  updateIpAddressStateController,
  updateIpAddressController,
  deleteIpAddressController,
} from "../../controllers/extrajudicial/ext-ip-address-bank-controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createIpAddressSchema,
  updateIpAddressStateSchema,
  updateIpAddressSchema,
  getIpAddressSchema,
  getIpAddressByIpSchema,
} = IpAddressSchema;
const router = express.Router();

router.get("/", JWTAuth, getIpAddressController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getIpAddressSchema, "params"),
  getIpAddressByIdController
);

router.get(
  "/:ip",
  JWTAuth,
  validatorHandler(getIpAddressByIpSchema, "params"),
  getIpAddressByIpController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P14-01"),
  validatorHandler(createIpAddressSchema, "body"),
  createIpAddressController
);

router.patch(
  "/state/:id",
  JWTAuth,
  checkPermissions("P14-02"),
  validatorHandler(getIpAddressSchema, "params"),
  validatorHandler(updateIpAddressStateSchema, "body"),
  updateIpAddressStateController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P14-03"),
  validatorHandler(getIpAddressSchema, "params"),
  validatorHandler(updateIpAddressSchema, "body"),
  updateIpAddressController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P14-04"),
  validatorHandler(getIpAddressSchema, "params"),
  deleteIpAddressController
);

export default router;

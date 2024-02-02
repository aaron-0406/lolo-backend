import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import customerUserSchema from "../../app/dash/schemas/dash-ip-address-bank.schema";
import {
  getDashIpAddressController,
  getDashIpAddressByIpController,
  getDashIpAddressByIdController,
  createDashIpAddressController,
  updateDashIpAddressStateController,
  updateDashIpAddressController,
  deleteDashIpAddressController,
} from "../../controllers/dash/dash-ip-address-bank-controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createIpAddressSchema,
  updateIpAddressStateSchema,
  updateIpAddressSchema,
  getIpAddressSchema,
  getIpAddressByIpSchema,
} = customerUserSchema;
const router = express.Router();

router.get("/", JWTAuth, getDashIpAddressController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getIpAddressSchema, "params"),
  getDashIpAddressByIdController
);

router.get(
  "/:ip",
  JWTAuth,
  validatorHandler(getIpAddressByIpSchema, "params"),
  getDashIpAddressByIpController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P14-01"),
  validatorHandler(createIpAddressSchema, "body"),
  createDashIpAddressController
);

router.patch(
  "/state/:id",
  JWTAuth,
  checkPermissions("P14-02"),
  validatorHandler(getIpAddressSchema, "params"),
  validatorHandler(updateIpAddressStateSchema, "body"),
  updateDashIpAddressStateController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P14-03"),
  validatorHandler(getIpAddressSchema, "params"),
  validatorHandler(updateIpAddressSchema, "body"),
  updateDashIpAddressController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P14-04"),
  validatorHandler(getIpAddressSchema, "params"),
  deleteDashIpAddressController
);

export default router;

import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import extAddressTypeSchema from "../../app/extrajudicial/schemas/ext-address-type.schema";
import {
  getAllAddressTypesController,
  getAddressTypeByCHBController,
  getAddressTypeByIdController,
  createAddressTypeController,
  updateAddressTypeController,
  deleteAddressTypeController,
} from "../../controllers/extrajudicial/ext-address-type.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createAddressTypeSchema,
  updateAddressTypeSchema,
  getAddressTypeByChbSchema,
  getAddressTypeByIDSchema,
} = extAddressTypeSchema;

const router = express.Router();

router.get("/", JWTAuth, getAllAddressTypesController);

router.get(
  "/all/:chb",
  JWTAuth,
  validatorHandler(getAddressTypeByChbSchema, "params"),
  getAddressTypeByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getAddressTypeByIDSchema, "params"),
  getAddressTypeByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P16-01"),
  validatorHandler(createAddressTypeSchema, "body"),
  createAddressTypeController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P16-02"),
  validatorHandler(getAddressTypeByIDSchema, "params"),
  validatorHandler(updateAddressTypeSchema, "body"),
  updateAddressTypeController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P16-03"),
  validatorHandler(getAddressTypeByIDSchema, "params"),
  deleteAddressTypeController
);

export default router;

import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import customerSchemas from "../../app/customers/schemas/customer.schema";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByUrlIdentifierController,
  updateCustomerController,
  updateCustomerStateController,
} from "../../controllers/customer.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getCustomerByUrlSchema,
  createCustomerSchema,
  getCustomerByID,
  updateCustomerSchema,
  updateStateCustomerSchema,
} = customerSchemas;
const router = express.Router();

router.get("/", JWTAuth, getAllCustomersController);

router.get(
  "/:urlIdentifier",
  validatorHandler(getCustomerByUrlSchema, "params"),
  getCustomerByUrlIdentifierController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createCustomerSchema, "body"),
  createCustomerController
);

router.put(
  "/state/:id",
  JWTAuth,
  validatorHandler(getCustomerByID, "params"),
  validatorHandler(updateStateCustomerSchema, "body"),
  updateCustomerStateController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerByID, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomerController
);

export default router;

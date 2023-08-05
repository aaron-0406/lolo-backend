import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import customerSchemas from "../app/customers/schemas/customer.schema";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByUrlIdentifierController,
  updateCustomerController,
  updateCustomerStateController,
} from "../controllers/customer.controller";

const {
  getCustomerByUrlSchema,
  createCustomerSchema,
  getCustomerByID,
  updateCustomerSchema,
  updateStateCustomerSchema,
} = customerSchemas;
const router = express.Router();

router.get("/", getAllCustomersController);

router.get(
  "/:urlIdentifier",
  validatorHandler(getCustomerByUrlSchema, "params"),
  getCustomerByUrlIdentifierController
);

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  createCustomerController
);

router.put(
  "/state/:id",
  validatorHandler(getCustomerByID, "params"),
  validatorHandler(updateStateCustomerSchema, "body"),
  updateCustomerStateController
);

router.patch(
  "/:id",
  validatorHandler(getCustomerByID, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomerController
);

export default router;

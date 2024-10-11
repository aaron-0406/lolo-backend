import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import customerSchemas from "../../app/dash/schemas/customer.schema";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByUrlIdentifierController,
  updateCustomerController,
  updateCustomerStateController,
  updateCustomerScrapperStateController
} from "../../controllers/dash/customer.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getCustomerByUrlSchema,
  createCustomerSchema,
  getCustomerByID,
  updateCustomerSchema,
  updateStateCustomerSchema,
  updateScrapperStateCustomerSchema
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
  "/scrapper-state/:id",
  JWTAuth,
  validatorHandler(getCustomerByID, "params"),
  validatorHandler(updateScrapperStateCustomerSchema, "body"),
  updateCustomerScrapperStateController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerByID, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomerController
);

export default router;

import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import customerHasBankSchema from "../app/customers/schemas/customer-has-bank.schema";
import {
  createCustomerHasBankController,
  deleteCustomerHasBankController,
  getCustomerHasBankByIdController,
  getCustomerHasBankController,
} from "../controllers/customer-has-bank.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const { getCustomerHasBankSchema, createCustomerHasBankSchema } =
  customerHasBankSchema;

const router = express.Router();

router.get("/", getCustomerHasBankController);

router.get(
  "/:idCustomer/:idBank",
  JWTAuth,
  validatorHandler(getCustomerHasBankSchema, "params"),
  getCustomerHasBankByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createCustomerHasBankSchema, "body"),
  createCustomerHasBankController
);

router.delete(
  "/:idCustomer/:idBank",
  JWTAuth,
  validatorHandler(getCustomerHasBankSchema, "params"),
  deleteCustomerHasBankController
);

export default router;

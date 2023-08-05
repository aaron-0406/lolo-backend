import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import customerHasBankSchema from "../app/customers/schemas/customer-has-bank.schema";
import {
  createCustomerHasBankController,
  deleteCustomerHasBankController,
  getCustomerHasBankByIdController,
  getCustomerHasBankController,
} from "../controllers/customer-has-bank.controller";

const {
  getCustomerSchema,
  getCustomerHasBankSchema,
  createCustomerHasBankSchema,
} = customerHasBankSchema;

const router = express.Router();

router.get("/", getCustomerHasBankController);

router.get(
  "/:idCustomer/:idBank",
  validatorHandler(getCustomerHasBankSchema, "params"),
  getCustomerHasBankByIdController
);

router.post(
  "/",
  validatorHandler(createCustomerHasBankSchema, "body"),
  createCustomerHasBankController
);

router.delete(
  "/:idCustomer/:idBank",
  validatorHandler(getCustomerHasBankSchema, "params"),
  deleteCustomerHasBankController
);

export default router;

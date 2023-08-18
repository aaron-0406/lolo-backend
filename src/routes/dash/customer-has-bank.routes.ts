import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import customerHasBankSchema from "../../app/dash/schemas/customer-has-bank.schema";
import {
  createCustomerHasBankController,
  deleteCustomerHasBankController,
  getCustomerHasBankByIdController,
  getCustomerHasBankByCustomerAndBankController,
  getCustomerHasBankController,
} from "../../controllers/dash/customer-has-bank.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getCustomerHasBankSchema,
  createCustomerHasBankSchema,
  getCustomerHasBankByIdSchema,
} = customerHasBankSchema;

const router = express.Router();

router.get("/", JWTAuth, getCustomerHasBankController);

router.get(
  "/chb/:id",
  JWTAuth,
  validatorHandler(getCustomerHasBankByIdSchema, "params"),
  getCustomerHasBankByIdController
);

router.get(
  "/:idCustomer/:idBank",
  JWTAuth,
  validatorHandler(getCustomerHasBankSchema, "params"),
  getCustomerHasBankByCustomerAndBankController
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

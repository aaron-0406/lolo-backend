import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import customerHasBankSchema from "../../app/dash/schemas/customer-has-bank.schema";
import {
  createCustomerHasBankController,
  deleteCustomerHasBankController,
  getCustomerHasBankByCustomerIdController,
  getCustomerHasBankByIdController,
  getCustomerHasBankController,
} from "../../controllers/dash/customer-has-bank.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  createCustomerHasBankSchema,
  getCustomerHasBankByCustomerIdSchema,
  getCustomerHasBankByIdSchema,
} = customerHasBankSchema;

const router = express.Router();

router.get("/", JWTAuth, getCustomerHasBankController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerHasBankByIdSchema, "params"),
  getCustomerHasBankByIdController
);

router.get(
  "customer/:idCustomer",
  JWTAuth,
  validatorHandler(getCustomerHasBankByCustomerIdSchema, "params"),
  getCustomerHasBankByCustomerIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createCustomerHasBankSchema, "body"),
  createCustomerHasBankController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerHasBankByIdSchema, "params"),
  deleteCustomerHasBankController
);

export default router;

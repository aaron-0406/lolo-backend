import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import customerUserSchema from "../app/customers/schemas/customer-user.schema";
import {
  getCustomerUsersController,
  getCustomerUserByCustomerIdController,
  getCustomerUserByIdController,
  createCustomerUserController,
  updateCustomerUserStateController,
  updateCustomerUserController,
  deleteCustomerUserController,
} from "../controllers/customer-user.controller";

const {
  getCustomerUserSchema,
  getCustomerUserByIdSchema,
  createCustomerUserSchema,
  updateCustomerUserSchema,
  updateCustomerUserStateSchema,
} = customerUserSchema;
const router = express.Router();

router.get("/", getCustomerUsersController);

router.get(
  "/users/:customerId",
  validatorHandler(getCustomerUserByIdSchema, "params"),
  getCustomerUserByCustomerIdController
);

router.get(
  "/:id",
  validatorHandler(getCustomerUserSchema, "params"),
  getCustomerUserByIdController
);

router.post(
  "/",
  validatorHandler(createCustomerUserSchema, "body"),
  createCustomerUserController
);

router.patch(
  "/state/:id",
  validatorHandler(getCustomerUserSchema, "params"),
  validatorHandler(updateCustomerUserStateSchema, "body"),
  updateCustomerUserStateController
);

router.patch(
  "/:id",
  validatorHandler(getCustomerUserSchema, "params"),
  validatorHandler(updateCustomerUserSchema, "body"),
  updateCustomerUserController
);

router.delete(
  "/:id",
  validatorHandler(getCustomerUserSchema, "params"),
  deleteCustomerUserController
);

export default router;

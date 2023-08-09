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
import { JWTAuth } from "../middlewares/auth.handler";

const {
  getCustomerUserSchema,
  getCustomerUserByIdSchema,
  createCustomerUserSchema,
  updateCustomerUserSchema,
  updateCustomerUserStateSchema,
} = customerUserSchema;
const router = express.Router();

router.get("/", JWTAuth, getCustomerUsersController);

router.get(
  "/users/:customerId",
  JWTAuth,
  validatorHandler(getCustomerUserByIdSchema, "params"),
  getCustomerUserByCustomerIdController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerUserSchema, "params"),
  getCustomerUserByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createCustomerUserSchema, "body"),
  createCustomerUserController
);

router.patch(
  "/state/:id",
  JWTAuth,
  validatorHandler(getCustomerUserSchema, "params"),
  validatorHandler(updateCustomerUserStateSchema, "body"),
  updateCustomerUserStateController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerUserSchema, "params"),
  validatorHandler(updateCustomerUserSchema, "body"),
  updateCustomerUserController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getCustomerUserSchema, "params"),
  deleteCustomerUserController
);

export default router;

import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import customerUserSchema from "../../app/dash/schemas/customer-user.schema";
import {
  getCustomerUsersController,
  getCustomerUserByCustomerIdController,
  getCustomerUserByIdController,
  createCustomerUserController,
  updateCustomerUserStateController,
  updateCustomerUserController,
  deleteCustomerUserController,
} from "../../controllers/dash/customer-user.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getCustomerUserSchema,
  getCustomerUserByIdSchema,
  createCustomerUserSchema,
  updateCustomerUserSchema,
  updateCustomerUserStateSchema,
  getCustomerUserByIdSchemaQuery,
} = customerUserSchema;
const router = express.Router();

router.get("/", JWTAuth, getCustomerUsersController);

router.get(
  "/users/:customerId",
  JWTAuth,
  checkPermissions("P10-05"),
  validatorHandler(getCustomerUserByIdSchema, "params"),
  validatorHandler(getCustomerUserByIdSchemaQuery, "query"),
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
  checkPermissions("P10-01"),
  validatorHandler(createCustomerUserSchema, "body"),
  createCustomerUserController
);

router.patch(
  "/state/:id",
  JWTAuth,
  checkPermissions("P10-04"),
  validatorHandler(getCustomerUserSchema, "params"),
  validatorHandler(updateCustomerUserStateSchema, "body"),
  updateCustomerUserStateController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P10-02"),
  validatorHandler(getCustomerUserSchema, "params"),
  validatorHandler(updateCustomerUserSchema, "body"),
  updateCustomerUserController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P10-03"),
  validatorHandler(getCustomerUserSchema, "params"),
  deleteCustomerUserController
);

export default router;

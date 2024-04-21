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
  getCustomerUserByOfficeController,
} from "../../controllers/dash/customer-user.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getCustomerUserSchema,
  getCustomerUserByIdSchema,
  createCustomerUserSchema,
  updateCustomerUserSchema,
  updateCustomerUserStateSchema,
  getCustomerUserByOfficeSchema,
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
  "/office/:officeId",
  JWTAuth,
  validatorHandler(getCustomerUserByOfficeSchema, "params"),
  getCustomerUserByOfficeController
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

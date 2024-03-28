import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import roleSchema from "../../app/dash/schemas/role.schema";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleByCustomerIdController,
  getRoleByIdController,
  updateRoleController,
} from "../../controllers/dash/role.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getRoleByIdSchema,
  createRoleSchema,
  updateRoleSchema,
  getAllRoleByCustomerIdSchema,
  getAllRoleByCustomerIdSchemaQuery,
} = roleSchema;
const router = express.Router();

router.get(
  "/customer/:customerId",
  JWTAuth,
  checkPermissions("P11-04"),
  validatorHandler(getAllRoleByCustomerIdSchema, "params"),
  validatorHandler(getAllRoleByCustomerIdSchemaQuery, "query"),
  getAllRoleByCustomerIdController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getRoleByIdSchema, "params"),
  getRoleByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P11-01"),
  validatorHandler(createRoleSchema, "body"),
  createRoleController
);

router.put(
  "/:id",
  JWTAuth,
  checkPermissions("P11-02"),
  validatorHandler(getRoleByIdSchema, "params"),
  validatorHandler(updateRoleSchema, "body"),
  updateRoleController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P11-03"),
  validatorHandler(getRoleByIdSchema, "params"),
  deleteRoleController
);

export default router;

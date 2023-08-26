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
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getRoleByIdSchema,
  createRoleSchema,
  updateRoleSchema,
  getAllRoleByCustomerIdSchema,
} = roleSchema;
const router = express.Router();

router.get(
  "/customer/:customerId",
  JWTAuth,
  validatorHandler(getAllRoleByCustomerIdSchema, "params"),
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
  validatorHandler(createRoleSchema, "body"),
  createRoleController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getRoleByIdSchema, "params"),
  validatorHandler(updateRoleSchema, "body"),
  updateRoleController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getRoleByIdSchema, "params"),
  deleteRoleController
);

export default router;

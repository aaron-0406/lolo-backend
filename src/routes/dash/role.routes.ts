import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import roleSchema from "../../app/boss/schemas/role.schema";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleController,
} from "../../controllers/dash/role.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getRoleSchema, createRoleSchema, updateRoleSchema, getAllRoleSchema } =
  roleSchema;
const router = express.Router();

router.get(
  "/",
  JWTAuth,
  validatorHandler(getAllRoleSchema, "params"),
  getAllRoleController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getRoleSchema, "params"),
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
  validatorHandler(getRoleSchema, "params"),
  validatorHandler(updateRoleSchema, "body"),
  updateRoleController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getRoleSchema, "params"),
  deleteRoleController
);

export default router;

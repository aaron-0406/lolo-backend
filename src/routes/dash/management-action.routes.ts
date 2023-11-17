import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import managementActionSchema from "../../app/dash/schemas/management-action.schema";
import {
  createManagementActionController,
  deleteManagementActionController,
  getManagementActionByCHBController,
  getManagementActionByIdController,
  getManagementActionsController,
  updateManagementActionController,
  getManagementActionByCHBControllerPaginated,
} from "../../controllers/dash/management-action.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getManagementActionSchema,
  getManagementActionByCHBSchema,
  createManagementActionSchema,
  updateManagementActionSchema,
  getManagementActionByCHBSchemaQuery,
} = managementActionSchema;
const router = express.Router();

router.get("/", JWTAuth, getManagementActionsController);

router.get(
  "/paginated/:chb",
  JWTAuth,
  validatorHandler(getManagementActionByCHBSchema, "params"),
  validatorHandler(getManagementActionByCHBSchemaQuery, "query"),
  getManagementActionByCHBControllerPaginated
);

router.get(
  "/all/:chb",
  JWTAuth,
  validatorHandler(getManagementActionByCHBSchema, "params"),
  getManagementActionByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getManagementActionSchema, "params"),
  getManagementActionByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P07-01"),
  validatorHandler(createManagementActionSchema, "body"),
  createManagementActionController
);

router.put(
  "/:id",
  JWTAuth,
  checkPermissions("P07-02"),
  validatorHandler(getManagementActionSchema, "params"),
  validatorHandler(updateManagementActionSchema, "body"),
  updateManagementActionController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P07-03"),
  validatorHandler(getManagementActionSchema, "params"),
  deleteManagementActionController
);

export default router;

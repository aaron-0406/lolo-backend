import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import managementActionSchema from "../app/boss/schemas/management-action.schema";
import {
  createManagementActionController,
  deleteManagementActionController,
  getManagementActionByCHBController,
  getManagementActionByIdController,
  getManagementActionsController,
  updateManagementActionController,
} from "../controllers/management-action.controller";

const {
  getManagementActionSchema,
  getManagementActionByCHBSchema,
  createManagementActionSchema,
  updateManagementActionSchema,
} = managementActionSchema;
const router = express.Router();

router.get("/", getManagementActionsController);

router.get(
  "/all/:chb",
  validatorHandler(getManagementActionByCHBSchema, "params"),
  getManagementActionByCHBController
);

router.get(
  "/:id",
  validatorHandler(getManagementActionSchema, "params"),
  getManagementActionByIdController
);

router.post(
  "/",
  validatorHandler(createManagementActionSchema, "body"),
  createManagementActionController
);

router.put(
  "/:id",
  validatorHandler(getManagementActionSchema, "params"),
  validatorHandler(updateManagementActionSchema, "body"),
  updateManagementActionController
);

router.delete(
  "/:id",
  validatorHandler(getManagementActionSchema, "params"),
  deleteManagementActionController
);

export default router;

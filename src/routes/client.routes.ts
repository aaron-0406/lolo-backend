import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import clientSchema from "../app/extrajudicial/schemas/client.schema";
import {
  createClientController,
  deleteClientController,
  downloadExcelDailyManagementController,
  getAllClientsController,
  getClientByCodeCHBController,
  getClientsByCHBController,
  getClientsByCHBDetailsController,
  updateClientController,
} from "../controllers/client.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const {
  getClientByCHBSchema,
  getClientByCodeSchema,
  createClientSchema,
  updateClientSchema,
  getClientByCustomer,
  deleteClientByCodeSchema,
  getClientByCHBSchemaQuery,
  getDateSchema,
} = clientSchema;
const router = express.Router();

router.get("/", JWTAuth, getAllClientsController);

router.get(
  "/download-excel-daily-management",
  JWTAuth,
  validatorHandler(getDateSchema, "query"),
  downloadExcelDailyManagementController
);

router.get(
  "/:chb",
  JWTAuth,
  validatorHandler(getClientByCHBSchema, "params"),
  validatorHandler(getClientByCHBSchemaQuery, "query"),
  getClientsByCHBController
);

router.get(
  "/:chb/details",
  JWTAuth,
  validatorHandler(getClientByCHBSchema, "params"),
  getClientsByCHBDetailsController
);

router.get(
  "/:code/:chb",
  JWTAuth,
  validatorHandler(getClientByCodeSchema, "params"),
  getClientByCodeCHBController
);

router.post(
  "/:idCustomer",
  JWTAuth,
  validatorHandler(getClientByCustomer, "params"),
  validatorHandler(createClientSchema, "body"),
  createClientController
);

router.patch(
  "/:code/:chb",
  JWTAuth,
  validatorHandler(getClientByCodeSchema, "params"),
  validatorHandler(updateClientSchema, "body"),
  updateClientController
);

router.delete(
  "/:code/:chb/:idCustomer",
  JWTAuth,
  validatorHandler(deleteClientByCodeSchema, "params"),
  deleteClientController
);

export default router;

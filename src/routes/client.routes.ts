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

router.get("/", getAllClientsController);

router.get(
  "/download-excel-daily-management",
  validatorHandler(getDateSchema, "query"),
  downloadExcelDailyManagementController
);

router.get(
  "/:chb",
  validatorHandler(getClientByCHBSchema, "params"),
  validatorHandler(getClientByCHBSchemaQuery, "query"),
  getClientsByCHBController
);

router.get(
  "/:chb/details",
  validatorHandler(getClientByCHBSchema, "params"),
  getClientsByCHBDetailsController
);

router.get(
  "/:code/:chb",
  validatorHandler(getClientByCodeSchema, "params"),
  getClientByCodeCHBController
);

router.post(
  "/:idCustomer",
  validatorHandler(getClientByCustomer, "params"),
  validatorHandler(createClientSchema, "body"),
  createClientController
);

router.patch(
  "/:code/:chb",
  validatorHandler(getClientByCodeSchema, "params"),
  validatorHandler(updateClientSchema, "body"),
  updateClientController
);

router.delete(
  "/:code/:chb/:idCustomer",
  validatorHandler(deleteClientByCodeSchema, "params"),
  deleteClientController
);

export default router;

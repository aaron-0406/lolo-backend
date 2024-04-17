import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import clientSchema from "../../app/extrajudicial/schemas/client.schema";
import {
  saveClientController,
  transferClientToAnotherBankController,
  deleteClientController,
  downloadExcelDailyManagementController,
  getAllClientsController,
  getClientByCodeCHBController,
  getClientsByCHBController,
  getClientsByCHBDetailsController,
  getClientsByNameOrCodeController,
} from "../../controllers/extrajudicial/client.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getClientByCHBSchema,
  getClientByCodeSchema,
  getClientByCustomer,
  getClientByCHBSchemaQuery,
  getClientByNameOrCodeSchemaQuery,
  getDateSchema,
  saveClientSchema,
  transferClientToAnotherBankSchema,
  deleteClientByCodeSchema,
} = clientSchema;

const router = express.Router();

router.get("/", JWTAuth, getAllClientsController);

router.get(
  "/download-excel-daily-management",
  JWTAuth,
  checkPermissions("P02-01"),
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
  "/:chb/by-name-or-code",
  JWTAuth,
  validatorHandler(getClientByCHBSchema, "params"),
  validatorHandler(getClientByNameOrCodeSchemaQuery, "query"),
  getClientsByNameOrCodeController
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
  validatorHandler(saveClientSchema, "body"),
  saveClientController
);

router.post(
  "/transfer-client-to-another-bank/:chb",
  JWTAuth,
  checkPermissions("P02-06"),
  validatorHandler(getClientByCHBSchema, "params"),
  validatorHandler(transferClientToAnotherBankSchema, "body"),
  transferClientToAnotherBankController
);

router.delete(
  "/:code/:chb/:idCustomer",
  JWTAuth,
  checkPermissions("P02-05"),
  validatorHandler(deleteClientByCodeSchema, "params"),
  deleteClientController
);

export default router;

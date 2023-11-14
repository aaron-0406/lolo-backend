import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import clientSchema from "../../app/extrajudicial/schemas/client.schema";
import {
  saveClientController,
  deleteClientController,
  downloadExcelDailyManagementController,
  getAllClientsController,
  getClientByCodeCHBController,
  getClientsByCHBController,
  getClientsByCHBDetailsController,
  getClientsByNameController,
} from "../../controllers/extrajudicial/client.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getClientByCHBSchema,
  getClientByCodeSchema,
  saveClientSchema,
  getClientByCustomer,
  deleteClientByCodeSchema,
  getClientByCHBSchemaQuery,
  getClientByNameSchemaQuery,
  getDateSchema,
} = clientSchema;

import ClientService from "../../app/extrajudicial/services/client.service";

const service = new ClientService();
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
  "/:chb/by-name",
  JWTAuth,
  validatorHandler(getClientByCHBSchema, "params"),
  validatorHandler(getClientByNameSchemaQuery, "query"),
  getClientsByNameController
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
  (req, res, next) => {
    const { chb, code } = req.body;
    // const exits = await service.doesClientExist(code, chb)
    // const customPermission = exits ? "P02-04" : "P02-03";
    const customPermission = "P02-04"
    console.log(customPermission);
    checkPermissions(customPermission)(req, res, next);
  },
  validatorHandler(getClientByCustomer, "params"),
  validatorHandler(saveClientSchema, "body"),
  saveClientController
);

router.delete(
  "/:code/:chb/:idCustomer",
  JWTAuth,
  checkPermissions("P02-05"),
  validatorHandler(deleteClientByCodeSchema, "params"),
  deleteClientController
);

export default router;

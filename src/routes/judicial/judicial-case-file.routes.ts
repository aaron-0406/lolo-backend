import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialCaseFileSchema from "../../app/judicial/schemas/judicial-case-file.schema";
import {
  createJudicialCaseFileController,
  deleteJudicialCaseFileController,
  getJudicialCaseFileByClientIdController,
  getJudicialCaseFileByIdController,
  getJudicialCaseFileController,
  updateJudicialCaseFileController,
  getJudicialCaseFileByNumberCaseFileController,
  getJudicialCaseFileByCHBIdController,
  getJudicialCaseFileRelatedController,
  createQrCodeToCaseFileController,
  updateJudicialCaseProcessStatus,
} from "../../controllers/judicial/judicial-case-file.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getJudicialCaseFileByClientIDSchema,
  getJudicialCaseFileByIDSchema,
  getJudicialCaseFileByNumberCaseFileSchema,
  createJudicialCaseFileSchema,
  updateJudicialCaseFileSchema,
  updateJudicialCaseFileProcessStatusSchema,
  getJudicialCaseFileByCHBSchema,
  getJudicialCaseFileByCHBSchemaQuery,
  getJudicialCaseFileByCustomerIdSchema,
  createQrCodeSchema,
} = judicialCaseFileSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialCaseFileController);

router.get(
  "/client/:clientId",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByClientIDSchema, "params"),
  getJudicialCaseFileByClientIdController
);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByCHBSchema, "params"),
  validatorHandler(getJudicialCaseFileByCHBSchemaQuery, "query"),
  getJudicialCaseFileByCHBIdController
);

router.get(
  "/number-case/:numberCaseFile/:chb",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByNumberCaseFileSchema, "params"),
  getJudicialCaseFileByNumberCaseFileController
);

router.get(
  "/related/:numberCaseFile/:chb",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByNumberCaseFileSchema, "params"),
  getJudicialCaseFileRelatedController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  getJudicialCaseFileByIdController
);

router.post(
  "/:customerId",
  JWTAuth,
  checkPermissions("P13-02"),
  validatorHandler(getJudicialCaseFileByCustomerIdSchema, "params"),
  validatorHandler(createJudicialCaseFileSchema, "body"),
  createJudicialCaseFileController
);

router.post(
  "/qr-code/:numberCaseFile/:chb",
  JWTAuth,
  validatorHandler(createQrCodeSchema, "params"),
  createQrCodeToCaseFileController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P13-03"),
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  validatorHandler(updateJudicialCaseFileSchema, "body"),
  updateJudicialCaseFileController
);

router.patch(
  "/:id/process-status",
  JWTAuth,
  checkPermissions("P13-01-04-01"),
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  validatorHandler(updateJudicialCaseFileProcessStatusSchema, "body"),
  updateJudicialCaseProcessStatus
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P13-04"),
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  deleteJudicialCaseFileController
);

export default router;

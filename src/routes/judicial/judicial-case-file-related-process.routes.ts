import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialCaseFileSchema from "../../app/judicial/schemas/judicial-case-file.schema";


import {
  createJudicialCaseFileRelatedProcessController,
  deleteJudicialCaseFileRelatedProcessController,
  updateJudicialCaseFileRelatedProcessController,
  getJudicialCaseFileRelatedProcessbyCaseFileIdController,
  getJudicialCaseFileRelatedProcessController,
  getJudicialCaseFileRelatedProcessByClientIdController,
  getJudicialCaseFileRelatedProcessByCHBIdController,
  getJudicialCaseFileRelatedProcessByIdController,
  getJudicialCaseFileRelatedProcessByNumberCaseFileController,
  getJudicialCaseFileRelatedProcessRelatedController,
  createQrCodeRelatedProcessController
} from "../../controllers/judicial/judicial-case-file-related-process.controller"
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import judicialCaseFileRelatedProcessSchema from "../../app/judicial/schemas/judicial-case-file-related-process.schema";

const {
  createJudicialCaseFileRelatedProcessSchema,
  getRelatedProcessByCaseFileIdSchema,
  updateJudicialCaseFileRelatedProcessSchema,
  getJudicialCaseFileRelatedProcesByCHBSchema,
  getJudicialCaseFileRelatedProcesByCHBSchemaQuery,
  getJudicialCaseFileRelatedProcesByClientIDSchema,
  getJudicialCaseFileRelatedProcesByCustomerIdSchema,
  getJudicialCaseFileRelatedProcesByIDSchema,
  getJudicialCaseFileRelatedProcesByNumberCaseFileSchema,
  createQrCodeRelatedProcessSchema,
} = judicialCaseFileRelatedProcessSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialCaseFileRelatedProcessController);

router.get(
  "/client/:clientId",
  JWTAuth,
  validatorHandler( getJudicialCaseFileRelatedProcesByClientIDSchema, "params"),
  validatorHandler(getJudicialCaseFileRelatedProcesByCHBSchemaQuery, "query"),
  getJudicialCaseFileRelatedProcessByClientIdController,
);

router.get(
  "/case-file/:caseFileId",
  JWTAuth,
  validatorHandler(getRelatedProcessByCaseFileIdSchema, "params"),
  getJudicialCaseFileRelatedProcessbyCaseFileIdController,
);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialCaseFileRelatedProcesByCHBSchema, "params"),
  validatorHandler(getJudicialCaseFileRelatedProcesByCHBSchemaQuery, "query"),
  getJudicialCaseFileRelatedProcessByCHBIdController,
);

router.get(
  "/number-case/:numberCaseFile/:chb",
  JWTAuth,
  validatorHandler(getJudicialCaseFileRelatedProcesByNumberCaseFileSchema, "params"),
  getJudicialCaseFileRelatedProcessByNumberCaseFileController,
);

router.get(
  "/related/:numberCaseFile/:chb",
  JWTAuth,
  validatorHandler(getJudicialCaseFileRelatedProcesByNumberCaseFileSchema, "params"),
  getJudicialCaseFileRelatedProcessRelatedController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCaseFileRelatedProcesByIDSchema, "params"),
  getJudicialCaseFileRelatedProcessByIdController,
);

router.post(
  "/:customerId",
  JWTAuth,
  checkPermissions("P13-01-05-02"),
  validatorHandler(getJudicialCaseFileRelatedProcesByCustomerIdSchema, "params"),
  validatorHandler(createJudicialCaseFileRelatedProcessSchema, "body"),
  createJudicialCaseFileRelatedProcessController,
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-05-03"),
  validatorHandler(getJudicialCaseFileRelatedProcesByIDSchema, "params"),
  validatorHandler(updateJudicialCaseFileRelatedProcessSchema, "body"),
  updateJudicialCaseFileRelatedProcessController,
);

router.post(
  "/qr-code/:numberCaseFile/:chb",
  JWTAuth,
  validatorHandler(createQrCodeRelatedProcessSchema, "params"),
  createQrCodeRelatedProcessController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-05-04"),
  validatorHandler(getJudicialCaseFileRelatedProcesByIDSchema, "params"),
  deleteJudicialCaseFileRelatedProcessController
);

export default router;

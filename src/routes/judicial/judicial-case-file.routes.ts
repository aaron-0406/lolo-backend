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
  getJudicialCaseFileByNumberCaseFileController
} from "../../controllers/judicial/judicial-case-file.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialCaseFileByClientIDSchema,
  getJudicialCaseFileByIDSchema,
  getJudicialCaseFileByNumberCaseFileSchema,
  createJudicialCaseFileSchema,
  updateJudicialCaseFileSchema,
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
  "/number-case/:id",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByNumberCaseFileSchema, "params"),
  getJudicialCaseFileByNumberCaseFileController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  getJudicialCaseFileByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialCaseFileSchema, "body"),
  createJudicialCaseFileController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  validatorHandler(updateJudicialCaseFileSchema, "body"),
  updateJudicialCaseFileController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByIDSchema, "params"),
  deleteJudicialCaseFileController
);

export default router;

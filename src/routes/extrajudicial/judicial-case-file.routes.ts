import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialCaseFileSchema from "../../app/extrajudicial/schemas/judicial-case-file.schema";
import {
  createJudicialCaseFileController,
  deleteJudicialCaseFileController,
  getJudicialCaseFileByClientIdController,
  getJudicialCaseFileByIdController,
  getJudicialCaseFileController,
  updateJudicialCaseFileController,
} from "../../controllers/extrajudicial/judicial-case-file.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialCaseFileByClientIDSchema,
  getJudicialCaseFileByIDSchema,
  createJudicialCaseFileSchema,
  updateJudicialCaseFileSchema,
} = judicialCaseFileSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialCaseFileController);

router.get(
  "/all-client/:clientId",
  JWTAuth,
  validatorHandler(getJudicialCaseFileByClientIDSchema, "params"),
  getJudicialCaseFileByClientIdController
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

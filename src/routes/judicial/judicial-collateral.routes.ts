import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralSchema from "../../app/judicial/schemas/judicial-collateral.schema";
import {
  getCollateralByIDController,
  createCollateralController,
  deletedCollateralController,
  updateCollateralController,
  getCollateralByJudicialCaseFileIdController
} from "../../controllers/judicial/judicial-collateral.controller";

const {
  getJudicialCollateralByIDSchema,
  getJudicialCollateralByCHBSchema,
  createJudicialCollateralSchema,
  updateJudicialCollateralSchema,
  getJudicialCollateralByJudicialCaseFileIdSchema
} = judicialCollateralSchema;

const router = express.Router();

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralByIDSchema, "params"),
  getCollateralByIDController
);

router.get(
  "/all/:JudicialCaseFileId",
  JWTAuth,
  validatorHandler(getJudicialCollateralByJudicialCaseFileIdSchema, "params"),
  getCollateralByJudicialCaseFileIdController
);

router.post(
  "/:JudicialCaseFileId",
  JWTAuth,
  checkPermissions("P13-01-06-02"),
  validatorHandler(getJudicialCollateralByJudicialCaseFileIdSchema, "params"),
  validatorHandler(createJudicialCollateralSchema, "body"),
  createCollateralController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-06-03"),
  validatorHandler(updateJudicialCollateralSchema, "body"),
  updateCollateralController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-06-04"),
  validatorHandler(getJudicialCollateralByIDSchema, "params"),
  deletedCollateralController
);

export default router;
import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralChargesEncumbrancesTypeLoadSchema from "../../app/judicial/schemas/judicial-collateral-charges-encumbrances-type-load.schema";
import {
  findAllCollateralChargesEncumbrancesTypeLoadController,
  findCollateralChargesEncumbrancesTypeLoadByIDController,
  createCollateralChargesEncumbrancesTypeLoadController,
  deletedCollateralChargesEncumbrancesTypeLoadController,
  updateCollateralChargesEncumbrancesTypeLoadController,
} from "../../controllers/judicial/judicial-collateral-charges-encumbrances-type-load.controller";

const {
  getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema,
  getJudicialCollateralChargesEncumbrancesTypeLoadByCHBSchema,
  createJudicialCollateralChargesEncumbrancesTypeLoadSchema,
  updateJudicialCollateralChargesEncumbrancesTypeLoadSchema,
} = judicialCollateralChargesEncumbrancesTypeLoadSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialCollateralChargesEncumbrancesTypeLoadByCHBSchema, "params"),
  findAllCollateralChargesEncumbrancesTypeLoadController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, "params"),
  findCollateralChargesEncumbrancesTypeLoadByIDController
);

router.post(
  "/:JudicialCaseFileId",
  JWTAuth,
  checkPermissions("P13-01-06-02"),
  // validatorHandler(getJudicialCollateralChargesEncumbrancesTypeLoadByJudicialCaseFileIdSchema, "params"),
  validatorHandler(createJudicialCollateralChargesEncumbrancesTypeLoadSchema, "body"),
  createCollateralChargesEncumbrancesTypeLoadController
);

router.patch(
  "/:id",
  JWTAuth,
  // validatorHandler(updateJudicialCollateralChargesEncumbrancesTypeLoadSchema, "body"),
  updateCollateralChargesEncumbrancesTypeLoadController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, "params"),
  // deletedCollateralChargesEncumbrancesTypeLoadController
);

export default router;
import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralChargesEncumbrancesSchema from "../../app/judicial/schemas/judicial-collateral-charges-encumbrances.schema";
import {
  findAllCollateralChargesEncumbrancesController,
  findCollateralChargesEncumbrancesByIDController,
  createCollateralChargesEncumbrancesController,
  updateCollateralChargesEncumbrancesController,
} from "../../controllers/judicial/judicial-collateral-charges-encumbrances.controller";

const {
  getJudicialCollateralChargesEncumbrancesByIDSchema,
  createJudicialCollateralChargesEncumbrancesSchema,
} = judicialCollateralChargesEncumbrancesSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  // validatorHandler(getJudicialCollateralChargesEncumbrancesByCHBSchema, "params"),
  findAllCollateralChargesEncumbrancesController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralChargesEncumbrancesByIDSchema, "params"),
  findCollateralChargesEncumbrancesByIDController
);

router.post(
  "/:JudicialCaseFileId",
  JWTAuth,
  checkPermissions("P13-01-06-02"),
  // validatorHandler(getJudicialCollateralChargesEncumbrancesByJudicialCaseFileIdSchema, "params"),
  validatorHandler(createJudicialCollateralChargesEncumbrancesSchema, "body"),
  createCollateralChargesEncumbrancesController
);

router.patch(
  "/:id",
  JWTAuth,
  // validatorHandler(updateJudicialCollateralChargesEncumbrancesSchema, "body"),
  updateCollateralChargesEncumbrancesController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralChargesEncumbrancesByIDSchema, "params"),
  // deletedCollateralChargesEncumbrancesController
);

export default router;
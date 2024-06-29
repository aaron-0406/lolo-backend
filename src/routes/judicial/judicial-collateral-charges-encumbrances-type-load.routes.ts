import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralChargesEncumbrancesTypeLoadSchema from "../../app/judicial/schemas/judicial-collateral-charges-encumbrances-type-load.schema";
import {
  getAllCollateralChargesEncumbrancesTypeLoadController,
  getCollateralChargesEncumbrancesTypeLoadByIDController,
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
  getAllCollateralChargesEncumbrancesTypeLoadController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, "params"),
  getCollateralChargesEncumbrancesTypeLoadByIDController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P42-01"),
  validatorHandler(createJudicialCollateralChargesEncumbrancesTypeLoadSchema, "body"),
  createCollateralChargesEncumbrancesTypeLoadController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P42-02"),
  validatorHandler(updateJudicialCollateralChargesEncumbrancesTypeLoadSchema, "body"),
  updateCollateralChargesEncumbrancesTypeLoadController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P42-03"),
  validatorHandler(getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, "params"),
  deletedCollateralChargesEncumbrancesTypeLoadController
);

export default router;
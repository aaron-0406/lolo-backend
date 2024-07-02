import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralChargesEncumbrancesSchema from "../../app/judicial/schemas/judicial-collateral-charges-encumbrances.schema";
import {
  getAllChargesEncumbrancesByCollateralController,
  getCollateralChargesEncumbrancesByIDController,
  createCollateralChargesEncumbrancesController,
  updateCollateralChargesEncumbrancesController,
  deleteCollateralChargesEncumbrancesController,
} from "../../controllers/judicial/judicial-collateral-charges-encumbrances.controller";

const {
  getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema,
  upadteJudicialCollateralChargesEncumbrancesSchema,
  getJudicialCollateralChargesEncumbrancesByIDSchema,
  createJudicialCollateralChargesEncumbrancesSchema,
} = judicialCollateralChargesEncumbrancesSchema;

const router = express.Router();

router.get(
  "/all-charges-encumbrances/:collateralId",
  JWTAuth,
  validatorHandler(
    getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema,
    "params"
  ),
  getAllChargesEncumbrancesByCollateralController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(
    getJudicialCollateralChargesEncumbrancesByIDSchema,
    "params"
  ),
  getCollateralChargesEncumbrancesByIDController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P13-01-06-02"),
  validatorHandler(createJudicialCollateralChargesEncumbrancesSchema, "body"),
  createCollateralChargesEncumbrancesController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(upadteJudicialCollateralChargesEncumbrancesSchema, "body"),
  updateCollateralChargesEncumbrancesController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(
    getJudicialCollateralChargesEncumbrancesByIDSchema,
    "params"
  ),
  deleteCollateralChargesEncumbrancesController
);

export default router;

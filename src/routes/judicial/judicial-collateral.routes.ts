import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralSchema from "../../app/judicial/schemas/judicial-collateral.schema";
import {
  findAllCollateralByCHBController,
  createCollateralController,
  deletedCollateralController,
  updateCollateralController,
} from "../../controllers/judicial/judicial-collateral.controller";

const {
  getJudicialCollateralByIDSchema,
  getJudicialCollateralByCHBSchema,
  createJudicialCollateralSchema,
  updateJudicialCollateralSchema,
} = judicialCollateralSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialCollateralByCHBSchema, "params"),
  findAllCollateralByCHBController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialCollateralSchema, "body"),
  createCollateralController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateJudicialCollateralSchema, "body"),
  updateCollateralController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralByIDSchema, "params"),
  deletedCollateralController
);

export default router;
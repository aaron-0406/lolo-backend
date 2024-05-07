import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinDefendantProceduralActionSchema from "../../app/judicial/schemas/judicial-bin-defendant-procedural-action.schema";
import {
  createJudicialBinDefendantProceduralActionController,
  deleteJudicialBinDefendantProceduralActionController,
  getJudicialBinDefendantProceduralActionByCHBController,
  getJudicialBinDefendantProceduralActionByIdController,
  updateJudicialBinDefendantProceduralActionController,
} from "../../controllers/judicial/judicial-bin-defendant-procedural-action.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialBinDefendantProceduralActionByIDSchema,
  createJudicialBinDefendantProceduralActionSchema,
  updateJudicialBinDefendantProceduralActionSchema,
  getJudicialBinDefendantProceduralActionByCHBSchema,
} = judicialBinDefendantProceduralActionSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(
    getJudicialBinDefendantProceduralActionByCHBSchema,
    "params"
  ),
  getJudicialBinDefendantProceduralActionByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinDefendantProceduralActionByIDSchema, "params"),
  getJudicialBinDefendantProceduralActionByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialBinDefendantProceduralActionSchema, "body"),
  createJudicialBinDefendantProceduralActionController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinDefendantProceduralActionByIDSchema, "params"),
  validatorHandler(updateJudicialBinDefendantProceduralActionSchema, "body"),
  updateJudicialBinDefendantProceduralActionController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinDefendantProceduralActionByIDSchema, "params"),
  deleteJudicialBinDefendantProceduralActionController
);

export default router;

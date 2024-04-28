import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinProceduralStageSchema from "../../app/judicial/schemas/judicial-bin-procedural-stage.schema";
import {
  createJudicialBinProceduralStageController,
  deleteJudicialBinProceduralStageController,
  getJudicialBinProceduralStageByCHBController,
  getJudicialBinProceduralStageByIdController,
  updateJudicialBinProceduralStageController,
} from "../../controllers/judicial/judicial-bin-procedural-stage.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialBinProceduralStageByIDSchema,
  createJudicialBinProceduralStageSchema,
  updateJudicialBinProceduralStageSchema,
  getJudicialBinProceduralStageByCHBSchema,
} = judicialBinProceduralStageSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialBinProceduralStageByCHBSchema, "params"),
  getJudicialBinProceduralStageByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinProceduralStageByIDSchema, "params"),
  getJudicialBinProceduralStageByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialBinProceduralStageSchema, "body"),
  createJudicialBinProceduralStageController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinProceduralStageByIDSchema, "params"),
  validatorHandler(updateJudicialBinProceduralStageSchema, "body"),
  updateJudicialBinProceduralStageController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinProceduralStageByIDSchema, "params"),
  deleteJudicialBinProceduralStageController
);

export default router;

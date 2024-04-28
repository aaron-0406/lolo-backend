import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinTypeBinnacleSchema from "../../app/judicial/schemas/judicial-bin-type-binnacle.schema";
import {
  createJudicialBinTypeBinnacleController,
  deleteJudicialBinTypeBinnacleController,
  getJudicialBinTypeBinnacleByCHBController,
  getJudicialBinTypeBinnacleByIdController,
  updateJudicialBinTypeBinnacleController,
} from "../../controllers/judicial/judicial-bin-type-binnacle.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialBinTypeBinnacleByIDSchema,
  createJudicialBinTypeBinnacleSchema,
  updateJudicialBinTypeBinnacleSchema,
  getJudicialBinTypeBinnacleByCHBSchema,
} = judicialBinTypeBinnacleSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialBinTypeBinnacleByCHBSchema, "params"),
  getJudicialBinTypeBinnacleByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinTypeBinnacleByIDSchema, "params"),
  getJudicialBinTypeBinnacleByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialBinTypeBinnacleSchema, "body"),
  createJudicialBinTypeBinnacleController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinTypeBinnacleByIDSchema, "params"),
  validatorHandler(updateJudicialBinTypeBinnacleSchema, "body"),
  updateJudicialBinTypeBinnacleController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinTypeBinnacleByIDSchema, "params"),
  deleteJudicialBinTypeBinnacleController
);

export default router;

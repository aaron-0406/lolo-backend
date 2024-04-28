import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinnacleSchema from "../../app/judicial/schemas/judicial-binnacle.schema";
import {
  createJudicialBinnacleController,
  deleteJudicialBinnacleController,
  getJudicialBinnacleByCHBController,
  getJudicialBinnacleByIdController,
  updateJudicialBinnacleController,
} from "../../controllers/judicial/judicial-binnacle.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialBinnacleByIDSchema,
  createJudicialBinnacleSchema,
  updateJudicialBinnacleSchema,
  getJudicialBinnacleByCHBSchema,
} = judicialBinnacleSchema;

const router = express.Router();

router.get(
  "/file-case/:fileCase",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByCHBSchema, "params"),
  getJudicialBinnacleByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
  getJudicialBinnacleByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialBinnacleSchema, "body"),
  createJudicialBinnacleController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
  validatorHandler(updateJudicialBinnacleSchema, "body"),
  updateJudicialBinnacleController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
  deleteJudicialBinnacleController
);

export default router;

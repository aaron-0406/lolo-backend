import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialProceduralWaySchema from "../../app/judicial/schemas/judicial-procedural-way.schema";
import {
  createJudicialProceduralWayController,
  deleteJudicialProceduralWayController,
  getJudicialProceduralWayByCHBController,
  getJudicialProceduralWayByIdController,
  getJudicialProceduralWayController,
  updateJudicialProceduralWayController,
} from "../../controllers/judicial/judicial-procedural-way.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialProceduralWayByIDSchema,
  createJudicialProceduralWaySchema,
  updateJudicialProceduralWaySchema,
  getJudicialProcedurakWayByCHBSchema,
} = judicialProceduralWaySchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialProceduralWayController);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialProcedurakWayByCHBSchema, "params"),
  getJudicialProceduralWayByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialProceduralWayByIDSchema, "params"),
  getJudicialProceduralWayByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialProceduralWaySchema, "body"),
  createJudicialProceduralWayController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialProceduralWayByIDSchema, "params"),
  validatorHandler(updateJudicialProceduralWaySchema, "body"),
  updateJudicialProceduralWayController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialProceduralWayByIDSchema, "params"),
  deleteJudicialProceduralWayController
);

export default router;

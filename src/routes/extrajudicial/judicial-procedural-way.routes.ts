import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialProceduralWaySchema from "../../app/extrajudicial/schemas/judicial-procedural-way.schema";
import {
  createJudicialProceduralWayController,
  deleteJudicialProceduralWayController,
  getJudicialProceduralWayByIdController,
  getJudicialProceduralWayController,
  updateJudicialProceduralWayController,
} from "../../controllers/extrajudicial/judicial-procedural-way.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialProceduralWayByIDSchema,
  createJudicialProceduralWaySchema,
  updateJudicialProceduralWaySchema,
} = judicialProceduralWaySchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialProceduralWayController);

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

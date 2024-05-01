import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import judicialObservationSchema from "../../app/judicial/schemas/judicial-observation.schema";
import {
  getJudicialObsTypeController,
  getJudicialObsTypeByCHBController,
  getJudicialObsTypeByIdController,
  createJudicialObsTypeController,
  updateJudicialObsTypeController,
  deleteJudicialObsTypeController,
} from "../../controllers/judicial/judicial-obs-type.controller";

const {
  createJudicialObservationSchema,
  updateJudicialObservationSchema,
  getJudicialObservationByIDSchema,
  getJudicialObservationByCHBAndJudicialCaseSchema,
  getJudicialObservationByCHBAndJudicialCaseSchemaQuery,
} = judicialObservationSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialObsTypeController);

router.get(
  "/data-by-chb-and-jucial-case/:chb/:judicialCaseId",
  JWTAuth,
  checkPermissions("P13-01-02-04"),
  validatorHandler(getJudicialObservationByCHBAndJudicialCaseSchema, "params"),
  validatorHandler(
    getJudicialObservationByCHBAndJudicialCaseSchemaQuery,
    "query"
  ),
  getJudicialObsTypeByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialObservationByIDSchema, "params"),
  getJudicialObsTypeByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P13-01-02-01"),
  validatorHandler(createJudicialObservationSchema, "body"),
  createJudicialObsTypeController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-02-02"),
  validatorHandler(getJudicialObservationByIDSchema, "params"),
  validatorHandler(updateJudicialObservationSchema, "body"),
  updateJudicialObsTypeController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-02-03"),
  validatorHandler(getJudicialObservationByIDSchema, "params"),
  deleteJudicialObsTypeController
);

export default router;

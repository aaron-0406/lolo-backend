import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import judicialObsTypeSchema from "../../app/judicial/schemas/judicial-obs-type.schema";
import {
  getJudicialObsTypeController,
  getJudicialObsTypeByCHBController,
  getJudicialObsTypeByIdController,
  createJudicialObsTypeController,
  updateJudicialObsTypeController,
  deleteJudicialObsTypeController,
} from "../../controllers/judicial/judicial-obs-type.controller";

const {
  createJudicialObsTypeSchema,
  updateJudicialObsTypeSchema,
  getJudicialObsTypeByIDSchema,
  getJudicialObsTypeByCHBSchema,
  getJudicialObsTypeByCHBSchemaQuery,
} = judicialObsTypeSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialObsTypeController);

router.get(
  "/all-data-by-chb/:chb",
  JWTAuth,
  checkPermissions("P23-04"),
  validatorHandler(getJudicialObsTypeByCHBSchema, "params"),
  validatorHandler(getJudicialObsTypeByCHBSchemaQuery, "query"),
  getJudicialObsTypeByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialObsTypeByIDSchema, "params"),
  getJudicialObsTypeByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P23-01"),
  validatorHandler(createJudicialObsTypeSchema, "body"),
  createJudicialObsTypeController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P23-02"),
  validatorHandler(getJudicialObsTypeByIDSchema, "params"),
  validatorHandler(updateJudicialObsTypeSchema, "body"),
  updateJudicialObsTypeController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P23-03"),
  validatorHandler(getJudicialObsTypeByIDSchema, "params"),
  deleteJudicialObsTypeController
);

export default router;

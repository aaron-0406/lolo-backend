import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import judicialSedeSchema from "../../app/judicial/schemas/judicial-sede.schema";
import {
  getJudicialSedeController,
  getJudicialSedeByCHBController,
  getJudicialSedeByIdController,
  createJudicialSedeController,
  updateJudicialSedeController,
  deleteJudicialSedeController,
} from "../../controllers/judicial/judicial-sede.controller";

const {
  createJudicialSedeSchema,
  updateJudicialSedeSchema,
  getJudicialSedeByIDSchema,
  getJudicialSedeByCHBSchema,
  getJudicialSedeByCHBSchemaQuery,
} = judicialSedeSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialSedeController);

router.get(
  "/all-data-by-chb/:chb",
  JWTAuth,
  checkPermissions("P28-04"),
  validatorHandler(getJudicialSedeByCHBSchema, "params"),
  validatorHandler(getJudicialSedeByCHBSchemaQuery, "query"),
  getJudicialSedeByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialSedeByIDSchema, "params"),
  getJudicialSedeByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P28-01"),
  validatorHandler(createJudicialSedeSchema, "body"),
  createJudicialSedeController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P28-02"),
  validatorHandler(getJudicialSedeByIDSchema, "params"),
  validatorHandler(updateJudicialSedeSchema, "body"),
  updateJudicialSedeController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P28-03"),
  validatorHandler(getJudicialSedeByIDSchema, "params"),
  deleteJudicialSedeController
);

export default router;

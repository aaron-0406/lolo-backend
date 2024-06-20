import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth } from "../../middlewares/auth.handler";
import judicialUseOfPropertySchema from "../../app/judicial/schemas/judicial-use-of-property.schema";
import {
  createUseOfPropertyController,
  deletedUseOfPropertyController,
  findAllUseOfPropertiesByCHBController,
  updateUseOfPropertyController,
} from "../../controllers/judicial/judicial-use-of-property.controller";

const {
  createJudicialUseOfPropertySchema,
  getJudicialUseOfPropertyByCHBSchema,
  getJudicialUseOfPropertyByIDSchema,
  updateJudicialUseOfPropertySchema,
} = judicialUseOfPropertySchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialUseOfPropertyByCHBSchema, "params"),
  findAllUseOfPropertiesByCHBController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialUseOfPropertySchema, "body"),
  createUseOfPropertyController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateJudicialUseOfPropertySchema, "body"),
  updateUseOfPropertyController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialUseOfPropertyByIDSchema, "params"),
  deletedUseOfPropertyController
);

export default router;
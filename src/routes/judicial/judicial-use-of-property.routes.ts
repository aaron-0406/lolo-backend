import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialUseOfPropertySchema from "../../app/judicial/schemas/judicial-use-of-property.schema";
import {
  findUseOfPropertyByIdController,
  findAllUseOfPropertiesByCHBController,
  createUseOfPropertyController,
  deletedUseOfPropertyController,
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
  "/:id",
  JWTAuth,
  findUseOfPropertyByIdController,
  validatorHandler(getJudicialUseOfPropertyByIDSchema, "params")
);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialUseOfPropertyByCHBSchema, "params"),
  findAllUseOfPropertiesByCHBController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P38-01"),
  validatorHandler(createJudicialUseOfPropertySchema, "body"),
  createUseOfPropertyController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P38-02"),
  validatorHandler(getJudicialUseOfPropertyByIDSchema, "params"),
  validatorHandler(updateJudicialUseOfPropertySchema, "body"),
  updateUseOfPropertyController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P38-03"),
  validatorHandler(getJudicialUseOfPropertyByIDSchema, "params"),
  deletedUseOfPropertyController
);

export default router;

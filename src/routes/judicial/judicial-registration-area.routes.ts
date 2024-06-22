import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialRegistrationAreaSchema from "../../app/judicial/schemas/judicial-registration-area.schema";
import {
  createRegistrationAreaController,
  deletedRegistrationAreaController,
  findAllRegistrationAreasByCHBController,
  updateRegistrationAreaController,
  findRegistrationAreaByIdController
} from "../../controllers/judicial/judicial-registration-area.controller";

const {
  createJudicialRegistrationAreaSchema,
  getJudicialRegistrationAreaByCHBSchema,
  getJudicialRegistrationAreaByIDSchema,
  updateJudicialRegistrationAreaSchema,
} = judicialRegistrationAreaSchema;

const router = express.Router();

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialRegistrationAreaByIDSchema, "params"),
  findRegistrationAreaByIdController
);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialRegistrationAreaByCHBSchema, "params"),
  findAllRegistrationAreasByCHBController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P39-01"),
  validatorHandler(createJudicialRegistrationAreaSchema, "body"),
  createRegistrationAreaController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P39-02"),
  validatorHandler(updateJudicialRegistrationAreaSchema, "body"),
  updateRegistrationAreaController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P39-03"),
  validatorHandler(getJudicialRegistrationAreaByIDSchema, "params"),
  deletedRegistrationAreaController
);

export default router;
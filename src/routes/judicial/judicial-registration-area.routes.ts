import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth } from "../../middlewares/auth.handler";
import judicialRegistrationAreaSchema from "../../app/judicial/schemas/judicial-registration-area.schema";
import {
  createRegistrationAreaController,
  deletedRegistrationAreaController,
  findAllRegistrationAreasByCHBController,
  updateRegistrationAreaController,
} from "../../controllers/judicial/judicial-registration-area.controller";

const {
  createJudicialRegistrationAreaSchema,
  getJudicialRegistrationAreaByCHBSchema,
  getJudicialRegistrationAreaByIDSchema,
  updateJudicialRegistrationAreaSchema,
} = judicialRegistrationAreaSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialRegistrationAreaByCHBSchema, "params"),
  findAllRegistrationAreasByCHBController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialRegistrationAreaSchema, "body"),
  createRegistrationAreaController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateJudicialRegistrationAreaSchema, "body"),
  updateRegistrationAreaController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialRegistrationAreaByIDSchema, "params"),
  deletedRegistrationAreaController
);

export default router;
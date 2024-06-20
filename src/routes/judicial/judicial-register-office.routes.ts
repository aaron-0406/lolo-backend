import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth } from "../../middlewares/auth.handler";
import judicialRegisterOfficeSchema from "../../app/judicial/schemas/judicial-register-office.schema";
import {
  createRegisterOfficeController,
  deletedRegisterOfficeController,
  findAllRegisterOfficesByCHBController,
  findAllRegisterOfficesController,
  updateRegisterOfficeController,
} from "../../controllers/judicial/judicial-register-office.controller";

const {
  createJudicialRegisterOfficeSchema,
  getJudicialRegisterOfficeByCHBSchema,
  getJudicialRegisterOfficeByIDSchema,
  updateJudicialRegisterOfficeSchema,
} = judicialRegisterOfficeSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialRegisterOfficeByCHBSchema, "params"),
  findAllRegisterOfficesByCHBController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialRegisterOfficeSchema, "body"),
  createRegisterOfficeController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateJudicialRegisterOfficeSchema, "body"),
  updateRegisterOfficeController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialRegisterOfficeByIDSchema, "params"),
  deletedRegisterOfficeController
);

export default router;
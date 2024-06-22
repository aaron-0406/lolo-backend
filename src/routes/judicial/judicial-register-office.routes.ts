import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialRegisterOfficeSchema from "../../app/judicial/schemas/judicial-register-office.schema";
import {
  createRegisterOfficeController,
  deletedRegisterOfficeController,
  findAllRegisterOfficesByCHBController,
  updateRegisterOfficeController,
  findRegisterOfficeByIdController,
} from "../../controllers/judicial/judicial-register-office.controller";

const {
  createJudicialRegisterOfficeSchema,
  getJudicialRegisterOfficeByCHBSchema,
  getJudicialRegisterOfficeByIDSchema,
  updateJudicialRegisterOfficeSchema,
} = judicialRegisterOfficeSchema;

const router = express.Router();

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialRegisterOfficeByIDSchema, "params"),
  findRegisterOfficeByIdController
)

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialRegisterOfficeByCHBSchema, "params"),
  findAllRegisterOfficesByCHBController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P40-01"),
  validatorHandler(createJudicialRegisterOfficeSchema, "body"),
  createRegisterOfficeController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P40-02"),
  validatorHandler(updateJudicialRegisterOfficeSchema, "body"),
  updateRegisterOfficeController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P40-03"),
  validatorHandler(getJudicialRegisterOfficeByIDSchema, "params"),
  deletedRegisterOfficeController
);

export default router;
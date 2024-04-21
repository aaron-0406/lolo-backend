import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialSubjectSchema from "../../app/judicial/schemas/judicial-subject.schema";
import {
  createJudicialSubjectController,
  deleteJudicialSubjectController,
  getJudicialSubjectByCHBController,
  getJudicialSubjectByIdController,
  getJudicialSubjectController,
  updateJudicialSubjectController,
} from "../../controllers/judicial/judicial-subject.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialSubjectByIDSchema,
  createJudicialSubjectSchema,
  updateJudicialSubjectSchema,
  getJudicialSubjectByCHBSchema,
} = judicialSubjectSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialSubjectController);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialSubjectByCHBSchema, "params"),
  getJudicialSubjectByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialSubjectByIDSchema, "params"),
  getJudicialSubjectByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialSubjectSchema, "body"),
  createJudicialSubjectController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialSubjectByIDSchema, "params"),
  validatorHandler(updateJudicialSubjectSchema, "body"),
  updateJudicialSubjectController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialSubjectByIDSchema, "params"),
  deleteJudicialSubjectController
);

export default router;

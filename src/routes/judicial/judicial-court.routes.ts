import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialCourtSchema from "../../app/judicial/schemas/judicial-court.schema";
import {
  createJudicialCourtController,
  deleteJudicialCourtController,
  getJudicialCourtByCHBController,
  getJudicialCourtByIdController,
  getJudicialCourtController,
  updateJudicialCourtController,
} from "../../controllers/judicial/judicial-court.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialCourtByIDSchema,
  createJudicialCourtSchema,
  updateJudicialCourtSchema,
  getJudicialCourtByCHBSchema,
} = judicialCourtSchema;

const router = express.Router();

router.get("/", JWTAuth, getJudicialCourtController);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialCourtByCHBSchema, "params"),
  getJudicialCourtByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCourtByIDSchema, "params"),
  getJudicialCourtByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialCourtSchema, "body"),
  createJudicialCourtController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCourtByIDSchema, "params"),
  validatorHandler(updateJudicialCourtSchema, "body"),
  updateJudicialCourtController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCourtByIDSchema, "params"),
  deleteJudicialCourtController
);

export default router;

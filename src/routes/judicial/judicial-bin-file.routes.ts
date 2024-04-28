import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinFileSchema from "../../app/judicial/schemas/judicial-bin-file.schema";
import {
  createJudicialBinFileController,
  deleteJudicialBinFileController,
  getJudicialBinFileByCHBController,
  getJudicialBinFileByIdController,
  updateJudicialBinFileController,
} from "../../controllers/judicial/judicial-bin-file.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getJudicialBinFileByIDSchema,
  createJudicialBinFileSchema,
  updateJudicialBinFileSchema,
  getJudicialBinFileByCHBSchema,
} = judicialBinFileSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialBinFileByCHBSchema, "params"),
  getJudicialBinFileByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinFileByIDSchema, "params"),
  getJudicialBinFileByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialBinFileSchema, "body"),
  createJudicialBinFileController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinFileByIDSchema, "params"),
  validatorHandler(updateJudicialBinFileSchema, "body"),
  updateJudicialBinFileController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinFileByIDSchema, "params"),
  deleteJudicialBinFileController
);

export default router;

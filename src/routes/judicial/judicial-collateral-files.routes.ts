import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralFilesSchema from "../../app/judicial/schemas/judicial-collateral-files.schema";
import {
  findAllCollateralFilesController,
  findCollateralFileByIDController,
  createCollateralFileController,
  deletedCollateralFileController,
  updateCollateralFileController,
} from "../../controllers/judicial/judicial-collateral-files.controller";

const {
  getJudicialCollateralFilesByIDSchema,
  getJudicialCollateralFilesByJudicialCollateralIdSchema,
  createJudicialCollateralFilesSchema,
  updateJudicialCollateralFilesSchema,
} = judicialCollateralFilesSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  // validatorHandler(getJudicialCollateralFilesByCHBSchema, "params"),
  findAllCollateralFilesController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralFilesByIDSchema, "params"),
  findCollateralFileByIDController
);

router.post(
  "/:JudicialCaseFileId",
  JWTAuth,
  checkPermissions("P13-01-06-02"),
  // validatorHandler(getJudicialCollateralFilesByJudicialCaseFileIdSchema, "params"),
  validatorHandler(createJudicialCollateralFilesSchema, "body"),
  createCollateralFileController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateJudicialCollateralFilesSchema, "body"),
  updateCollateralFileController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralFilesByIDSchema, "params"),
  deletedCollateralFileController
);

export default router;
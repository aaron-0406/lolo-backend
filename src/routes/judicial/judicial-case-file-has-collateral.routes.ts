import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import {
  getAllRelatedCaseFileAssociatedToCollateral,
  assingCollateralToCaseFile,
} from "../../controllers/judicial/judicial-case-file-has-collateral.controller";
import judicialCaseFileHasCollateralSchema from "../../app/judicial/schemas/judicial-case-file-has-collateral.schema";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";

const {
  getAllRelatedCaseFileAssociateToCollateralSchema,
  getCaseFileHasCollateralByIdSchema,
  assingCollateralToCaseFileSchema,
} = judicialCaseFileHasCollateralSchema;
const router = express.Router();

router.get(
  "/:chb/:numberCaseFile/:collateralId",
  JWTAuth,
  validatorHandler(getAllRelatedCaseFileAssociateToCollateralSchema, "params"),
  getAllRelatedCaseFileAssociatedToCollateral
);

router.post(
  "/:collateralId",
  JWTAuth,
  checkPermissions("P13-01-06-01-01"),
  validatorHandler(getCaseFileHasCollateralByIdSchema, "params"),
  validatorHandler(assingCollateralToCaseFileSchema, "body"),
  assingCollateralToCaseFile
);

export default router;

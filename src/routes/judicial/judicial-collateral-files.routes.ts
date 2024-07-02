import express, { Request, Response, NextFunction } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";
import judicialCollateralFilesSchema from "../../app/judicial/schemas/judicial-collateral-files.schema";
import {
  getAllCollateralFilesController,
  getCollateralFileByIDController,
  createCollateralFileController,
  deletedCollateralFileController
} from "../../controllers/judicial/judicial-collateral-files.controller";
import { archivosCollateral } from "../../middlewares/multer.handler";
import boom from '@hapi/boom';

const {
  getJudicialCollateralFilesByIDSchema,
  getJudicialCollateralFilesByJudicialCollateralIdSchema,
  createJudicialCollateralFilesParamSchema,
  getCollateralFileByIDSchema
} = judicialCollateralFilesSchema;

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivosCollateral.array("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

const router = express.Router();

router.get(
  "/:chb/:collateralId",
  JWTAuth,
  validatorHandler(getJudicialCollateralFilesByJudicialCollateralIdSchema, "params"),
  getAllCollateralFilesController
);

router.get(
  "/:chb/:collateralId/:id",
  JWTAuth,
  checkPermissions("P13-01-06-01-03-01"),
  validatorHandler(getCollateralFileByIDSchema, "params"),
  getCollateralFileByIDController
);

router.post(
  "/:chb/:collateralId",
  JWTAuth,
  checkPermissions("P13-01-06-01-03-02"),
  validatorHandler(createJudicialCollateralFilesParamSchema, "params"),
  multerFile,
  createCollateralFileController
);

router.delete(
  "/:chb/:collateralId/:id",
  JWTAuth,
  checkPermissions("P13-01-06-01-03-04"),
  validatorHandler(getCollateralFileByIDSchema, "params"),
  deletedCollateralFileController
);

export default router;
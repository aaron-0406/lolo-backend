import express, { Request, Response, NextFunction } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialObservationSchema from "../../app/judicial/schemas/judicial-observation.schema";
import boom from "@hapi/boom";

import {
  createJudicialObservationController,
  deleteJudicialObservationController,
  getJudicialObservationByCHBController,
  getJudicialObservationByIdController,
  updateJudicialObservationController,
} from "../../controllers/judicial/judicial-observation.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";
import { archivos } from "../../middlewares/multer.handler";

const {
  getJudicialObservationByIDSchema,
  createJudicialObservationParamSchema,
  getJudicialObservationByCHBSchema,
  updateJudicialObservationParamSchema,
  getJudicialObservationByCHBSchemaQuery,
} = judicialObservationSchema;

const router = express.Router();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivos.array("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.get(
  "/file-case/:fileCase",
  JWTAuth,
  checkPermissions("P13-01-02-04"),
  validatorHandler(getJudicialObservationByCHBSchema, "params"),
  validatorHandler(getJudicialObservationByCHBSchemaQuery, "query"),
  getJudicialObservationByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialObservationByIDSchema, "params"),
  getJudicialObservationByIdController
);

router.post(
  "/:idCustomer/:code",
  JWTAuth,
  checkPermissions("P13-01-02-01"),
  validatorHandler(createJudicialObservationParamSchema, "params"),
  multerFile,
  createJudicialObservationController
);

router.patch(
  "/:id/:idCustomer/:code",
  JWTAuth,
  checkPermissions("P13-01-02-02"),
  validatorHandler(updateJudicialObservationParamSchema, "params"),
  multerFile,
  updateJudicialObservationController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P13-01-02-03"),
  validatorHandler(getJudicialObservationByIDSchema, "params"),
  deleteJudicialObservationController
);

export default router;

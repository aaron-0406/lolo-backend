import express, { Request, Response, NextFunction } from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialBinnacleSchema from "../../app/judicial/schemas/judicial-binnacle.schema";
import boom from "@hapi/boom";

import {
  createJudicialBinnacleController,
  deleteJudicialBinnacleController,
  getJudicialBinnacleByCHBController,
  getJudicialBinnacleByIdController,
  updateJudicialBinnacleController,
} from "../../controllers/judicial/judicial-binnacle.controller";
import { JWTAuth } from "../../middlewares/auth.handler";
import { archivosBinnacle } from "../../middlewares/multer.handler";

const {
  getJudicialBinnacleByIDSchema,
  createJudicialBinnacleParamSchema,
  getJudicialBinnacleByCHBSchema,
  updateJudicialBinnacleParamSchema,
  getJudicialBinnacleByCHBSchemaQuery,
} = judicialBinnacleSchema;

const router = express.Router();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivosBinnacle.array("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.get(
  "/file-case/:fileCase",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByCHBSchema, "params"),
  validatorHandler(getJudicialBinnacleByCHBSchemaQuery, "query"),
  getJudicialBinnacleByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
  getJudicialBinnacleByIdController
);

router.post(
  "/:idCustomer/:code",
  JWTAuth,
  validatorHandler(createJudicialBinnacleParamSchema, "params"),
  multerFile,
  createJudicialBinnacleController
);

router.patch(
  "/:id/:idCustomer/:code",
  JWTAuth,
  validatorHandler(updateJudicialBinnacleParamSchema, "params"),
  multerFile,
  updateJudicialBinnacleController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
  deleteJudicialBinnacleController
);

export default router;

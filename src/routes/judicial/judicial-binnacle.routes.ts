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

const { getJudicialBinnacleByIDSchema, getJudicialBinnacleByCHBSchema } =
  judicialBinnacleSchema;

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
  getJudicialBinnacleByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
  getJudicialBinnacleByIdController
);

router.post("/", JWTAuth, multerFile, createJudicialBinnacleController);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialBinnacleByIDSchema, "params"),
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

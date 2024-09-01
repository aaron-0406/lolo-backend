import { Router, Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../../middlewares/auth.handler';
import { createTariffController, deleteTariffController, getTariffsController, updateTariffController } from '../../controllers/settings/tariff.controller'
import validatorHandler from "../../middlewares/validator.handler";

import tariffSchemas from '../../app/settings/schemas/tariff.schema';

const { getTariffsSchema, createTariffSchema, updateTariffSchema, deleteTariffSchema } = tariffSchemas;

const router = Router();

router.get(
  "/:chb",
  JWTAuth,
  validatorHandler(getTariffsSchema, "params"),
  getTariffsController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createTariffSchema, "body"),
  createTariffController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(updateTariffSchema, "body"),
  updateTariffController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(deleteTariffSchema, "params"),
  deleteTariffController
);

export default router;
import { Router, Request, Response, NextFunction } from 'express';
import { checkPermissions, JWTAuth } from '../../middlewares/auth.handler';
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
  checkPermissions("P43-01"),
  validatorHandler(createTariffSchema, "body"),
  createTariffController
);

router.patch(
  "/:id",
  JWTAuth,
  checkPermissions("P43-02"),
  validatorHandler(updateTariffSchema, "body"),
  updateTariffController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P43-03"),
  validatorHandler(deleteTariffSchema, "params"),
  deleteTariffController
);

export default router;
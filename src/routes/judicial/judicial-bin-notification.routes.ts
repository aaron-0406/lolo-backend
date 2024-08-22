import express, { Request, Response, NextFunction } from "express";
import { checkPermissions, JWTAuth } from "../../middlewares/auth.handler";

import validatorHandler from "../../middlewares/validator.handler";
import judicialBinNotificationSchema from "../../app/judicial/schemas/judicial-bin-notification.schema";
import {
  getAllNotificationsByBinnacleIdController
} from "../../controllers/judicial/judicial-bin-notification.controller";

const router = express.Router();

const { getAllNotificationsByBinnacleIdSchema } = judicialBinNotificationSchema;

router.get(
  "/:binnacleId",
  JWTAuth,
  checkPermissions("P13-01-01-04-01"),
  validatorHandler(getAllNotificationsByBinnacleIdSchema, "params"),
  getAllNotificationsByBinnacleIdController
);

export default router;
import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth } from "../../middlewares/auth.handler";

import {
  getNotificationByChbController,
  createNotificationController,
  updateNotificaitonController,
  deleteNotificationController,
} from "../../controllers/settings/scheduled-notifications.controller"

import scheduledNotificationSchema from "../../app/settings/schemas/scheduled-notifications.schema";

const {
  getScheduledNotificationSchema,
  getScheduledNotificationSchemaByCHBSchema,
  createScheduledNotificationSchema,
  updateScheduledNotificationSchema,
  deleteScheduledNotificationSchema,
} = scheduledNotificationSchema;

const router = express.Router();

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getScheduledNotificationSchemaByCHBSchema, "params"),
  getNotificationByChbController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createScheduledNotificationSchema, "body"),
  createNotificationController,
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getScheduledNotificationSchema, "params"),
  validatorHandler(updateScheduledNotificationSchema, "body"),
  updateNotificaitonController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(deleteScheduledNotificationSchema, "params"),
  deleteNotificationController
);

export default router;

import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

import {
  getNotificationByChbController,
  createNotificationController,
  updateNotificaitonController,
  deleteNotificationController,
} from "../../controllers/settings/scheduled-notifications.controller";

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
  checkPermissions("P29-01"),
  validatorHandler(createScheduledNotificationSchema, "body"),
  createNotificationController
);

router.put(
  "/:id",
  JWTAuth,
  checkPermissions("P29-02"),
  validatorHandler(getScheduledNotificationSchema, "params"),
  validatorHandler(updateScheduledNotificationSchema, "body"),
  updateNotificaitonController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P29-03"),
  validatorHandler(deleteScheduledNotificationSchema, "params"),
  deleteNotificationController
);

export default router;

import express from "express";
import validatorHandler from "../../middlewares/validator.handler";

import {
  getNotificationsUsersBySchuldeNotificationIdController,
  changeNotificationsUsersController,
} from "../../controllers/settings/scheduled-notifications-users.controller";
import { JWTAuth } from "../../middlewares/auth.handler";
import scheduledNotificationsUsersSchema from "../../app/settings/schemas/scheduled-notifications-users.schema";

const {
  getScheduledNotificationsUsersBySchuldeNotificationIdSchema,
  changeNotificationsUsersSchema,
} = scheduledNotificationsUsersSchema;
const router = express.Router();

router.get(
  "/scheduled-notification/:scheduledNotificationId",
  JWTAuth,
  validatorHandler(
    getScheduledNotificationsUsersBySchuldeNotificationIdSchema,
    "params"
  ),
  getNotificationsUsersBySchuldeNotificationIdController
);

router.post(
  "/change-notifications-users/:idNotification",
  JWTAuth,
  validatorHandler(changeNotificationsUsersSchema, "body"),
  changeNotificationsUsersController
);

export default router;

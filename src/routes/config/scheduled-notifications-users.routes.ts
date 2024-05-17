import express from "express";
import validatorHandler from "../../middlewares/validator.handler";

import {
  getNotificationsUsersController,
  getNotificationsUsersByIdController,
  getNotificationsUsersByCustomerIdController,
  getNotificationsUsersBySchuldeNotificationIdController,
  getNotificationsUsersByChbController,
  createNotificationsUsersController,
  updateNotificaitonsUsersController,
  deleteNotificationsUsersController,
} from "../../controllers/settings/scheduled-notifications-users.controller"
import { JWTAuth } from "../../middlewares/auth.handler";
import scheduledNotificationsUsersSchema from "../../app/settings/schemas/scheduled-notifications-users.schema";

const {
  getScheduledNotificationsUsersSchema,
  createScheduledNotificationsUsersSchema,
  updateScheduledNotificationsUsersSchema,
  getScheduledNotificationsUsersByCustomerIdSchema,
  getScheduledNotificationsUsersByChbSchema,
  getScheduledNotificationsUsersBySchuldeNotificationIdSchema,
} = scheduledNotificationsUsersSchema;
const router = express.Router();

router.get("/", JWTAuth, getNotificationsUsersController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getScheduledNotificationsUsersSchema, "params"),
  getNotificationsUsersByIdController
);

router.get(
  "/customer/:customerId",
  JWTAuth,
  validatorHandler(getScheduledNotificationsUsersByCustomerIdSchema, "params"),
  getNotificationsUsersByCustomerIdController
);

router.get(
  "/chb/:chbId",
  JWTAuth,
  validatorHandler(getScheduledNotificationsUsersByChbSchema, "params"),
  getNotificationsUsersByChbController
);

router.get(
  "/scheduled-notification/:scheduledNotificationId",
  JWTAuth,
  validatorHandler(getScheduledNotificationsUsersBySchuldeNotificationIdSchema, "params"),
  getNotificationsUsersBySchuldeNotificationIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createScheduledNotificationsUsersSchema, "body"),
  createNotificationsUsersController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getScheduledNotificationsUsersSchema, "params"),
  validatorHandler(updateScheduledNotificationsUsersSchema, "body"),
  updateNotificaitonsUsersController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getScheduledNotificationsUsersSchema, "params"),
  deleteNotificationsUsersController
);

export default router;

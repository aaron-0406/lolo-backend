import Joi from "joi";
import { ScheduledNotificationsUsersType } from "../types/scheduled-notifications-users.type";

const id = Joi.number();
const customerUserId = Joi.number();
const scheduledNotificationId = Joi.number();
const customerHasBankId = Joi.number();

const createScheduledNotificationsUsersSchema = Joi.object<
  Omit<
    ScheduledNotificationsUsersType,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  customerUserId: customerUserId.required(),
  customerHasBankId: customerHasBankId.required(),
  scheduledNotificationId: scheduledNotificationId.required(),
});

const updateScheduledNotificationsUsersSchema = Joi.object<
  Omit<
    ScheduledNotificationsUsersType,
    "id" | "createdAt" | "updatedAt" | "deletedAt" | "customerHasBankId"
  >,
  true
>({
  customerUserId: customerUserId,
  scheduledNotificationId: scheduledNotificationId,
});

const changeNotificationsUsersSchema: Joi.ObjectSchema = Joi.object({
  data: Joi.string().required(),
});

const getScheduledNotificationsUsersSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getScheduledNotificationsUsersByChbSchema = Joi.object<
  { id: number },
  true
>({
  id: id.required(),
});

const getScheduledNotificationsUsersBySchuldeNotificationIdSchema = Joi.object<
  { scheduledNotificationId: number },
  true
>({
  scheduledNotificationId: scheduledNotificationId.required(),
});

export default {
  getScheduledNotificationsUsersSchema,
  getScheduledNotificationsUsersByChbSchema,
  getScheduledNotificationsUsersBySchuldeNotificationIdSchema,
  createScheduledNotificationsUsersSchema,
  updateScheduledNotificationsUsersSchema,
  changeNotificationsUsersSchema,
};

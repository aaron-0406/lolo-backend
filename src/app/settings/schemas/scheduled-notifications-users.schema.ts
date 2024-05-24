import Joi from "joi";
import { ScheduledNotificationsUsersType } from "../types/scheduled-notifications-users.type";

const id = Joi.number();
const customerUserId = Joi.number();
const scheduledNotificationId = Joi.number();
const customerHasBankId = Joi.number();

const changeNotificationsUsersSchema: Joi.ObjectSchema = Joi.object({
  data: Joi.string().required(),
});

const getScheduledNotificationsUsersBySchuldeNotificationIdSchema = Joi.object<
  { scheduledNotificationId: number },
  true
>({
  scheduledNotificationId: scheduledNotificationId.required(),
});

export default {
  getScheduledNotificationsUsersBySchuldeNotificationIdSchema,
  changeNotificationsUsersSchema,
};

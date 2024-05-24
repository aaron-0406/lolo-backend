import { Request, Response, NextFunction } from "express";
import ScheduledNotificationsUsersService from "../../app/settings/services/scheduled-notifications-users.service";
import UserLogService from "../../app/dash/services/user-log.service";
import shceduledNotificationsUsersModel from "../../db/models/settings/scheduled-notifications-users.model";

const service = new ScheduledNotificationsUsersService();
const serviceUserLog = new UserLogService();
const { SCHEDULED_NOTIFICATIONS_USERS_TABLE } = shceduledNotificationsUsersModel

export const getNotificationsUsersBySchuldeNotificationIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { scheduledNotificationId } = req.params;
    const notification = await service.findAllByScheduledNotificationId(scheduledNotificationId);
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

export const changeNotificationsUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idNotification } = req.params;
    const body = req.body;
    const notificationsUsers = await service.changeNotificationsUsers(idNotification, body.data);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P29-04",
        entity: SCHEDULED_NOTIFICATIONS_USERS_TABLE,
        entityId: Number(idNotification),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }


    res.json(notificationsUsers);
  } catch (error) {
    next(error);
  }
};

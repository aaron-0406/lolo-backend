import { Request, Response, NextFunction } from "express";
import ScheduledNotificationsService from "../../app/settings/services/scheduled-notifications.service";
import UserLogService from "../../app/dash/services/user-log.service";
import shceduledNotificationsModel from "../../db/models/settings/scheduled-notifications.model";

const service = new ScheduledNotificationsService();
const serviceUserLog = new UserLogService();
const { SCHEDULED_NOTIFICATIONS_TABLE } = shceduledNotificationsModel

export const getNotificationByChbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const notification = await service.findAllByChb(chb);
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

export const createNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newNotification = await service.create(body);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P29-01",
        entity: SCHEDULED_NOTIFICATIONS_TABLE,
        entityId: Number(newNotification.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }


    res.status(201).json(newNotification);
  } catch (error) {
    next(error);
  }
};

export const updateNotificaitonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const notification = await service.update(id, body);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P29-02",
        entity: SCHEDULED_NOTIFICATIONS_TABLE,
        entityId: Number(notification.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }


    res.json(notification);
  } catch (error) {
    next(error);
  }
};

export const deleteNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P29-03",
        entity: SCHEDULED_NOTIFICATIONS_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }


    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

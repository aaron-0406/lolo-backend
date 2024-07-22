import { Request, Response, NextFunction } from "express";
import ScheduledNotificationsService from "../../app/settings/services/scheduled-notifications.service";
import UserLogService from "../../app/dash/services/user-log.service";
import shceduledNotificationsModel from "../../db/models/settings/scheduled-notifications.model";
import userLogUtils from "../../utils/dash/user-log.util";

const service = new ScheduledNotificationsService();
const serviceUserLog = new UserLogService();
const { SCHEDULED_NOTIFICATIONS_TABLE } = shceduledNotificationsModel;
const { generateLogSummary } = userLogUtils;

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
};

export const createNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newNotification = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: newNotification.dataValues,
      newData: newNotification.dataValues,
      name: newNotification.dataValues.nameNotification,
      id: newNotification.dataValues.id,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P29-01",
      entity: SCHEDULED_NOTIFICATIONS_TABLE,
      entityId: Number(newNotification.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

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
    const { oldNotification, newNotification } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: oldNotification,
      newData: newNotification,
      id: newNotification.id,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P29-02",
      entity: SCHEDULED_NOTIFICATIONS_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newNotification);
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
    const notifiaction = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      oldData: notifiaction.dataValues,
      newData: notifiaction.dataValues,
      name: notifiaction.dataValues.name,
      id: notifiaction.dataValues.id,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P29-03",
      entity: SCHEDULED_NOTIFICATIONS_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

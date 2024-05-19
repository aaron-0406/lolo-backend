import { Request, Response, NextFunction } from "express";
import ScheduledNotificationsService from "../../app/settings/services/scheduled-notifications.service";

const service = new ScheduledNotificationsService();

export const getNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await service.findAll();
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const getNotificationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const notification = await service.findOne(id);
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

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

export const getNotificationByLogicKeyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { logicKey } = req.params;
    const notification = await service.findAllByLogicKey(logicKey);
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
    const bank = await service.update(id, body);
    res.json(bank);
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
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

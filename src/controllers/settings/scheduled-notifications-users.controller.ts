import { Request, Response, NextFunction } from "express";
import ScheduledNotificationsUsersService from "../../app/settings/services/scheduled-notifications-users.service";

const service = new ScheduledNotificationsUsersService();

export const getNotificationsUsersController = async (
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

export const getNotificationsUsersByIdController = async (
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

export const getNotificationsUsersByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCustomer } = req.params;
    const notification = await service.findAllByCustomerId(idCustomer);
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

export const getNotificationsUsersByChbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const notification = await service.findAllByChbId(chb);
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

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
    const notifications = JSON.parse(body.data);
    const notificationsUsers = await service.changeNotificationsUsers(idNotification, body.data);
    res.json(notificationsUsers);
  } catch (error) {
    next(error);
  }
};

export const updateNotificaitonsUsersController = async (
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

export const deleteNotificationsUsersController = async (
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

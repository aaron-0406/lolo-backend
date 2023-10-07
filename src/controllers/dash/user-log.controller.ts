import { Request, Response, NextFunction } from "express";
import UserLogService from "../../app/dash/services/user-log.service";

const service = new UserLogService();

export const getAllUserLogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userLogs = await service.findAll();
    res.json(userLogs);
  } catch (error) {
    next(error);
  }
};

export const getAllUserLogsByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const userLogs = await service.findAllByCustomerId(customerId);
    res.json(userLogs);
  } catch (error) {
    next(error);
  }
};

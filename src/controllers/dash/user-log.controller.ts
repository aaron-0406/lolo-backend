import { Request, Response, NextFunction } from "express";
import UserLogService from "../../app/dash/services/user-log.service";
import PermissionService from "../../app/dash/services/permission.service";
import userLogModel from "../../db/models/user-log.model";

const servicePermission = new PermissionService();
const service = new UserLogService();

const { USER_LOG_TABLE } = userLogModel;

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

export const getUserLogsFilterByCustomerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const userLogs = await service.findByCustomerId(customerId, req.query);
    const { visible } = req.query;

    if (visible === "true") {
      await service.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P12-01",
        entity: USER_LOG_TABLE,
        entityId: Number(req.params.customerId),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(userLogs);
  } catch (error) {
    next(error);
  }
};

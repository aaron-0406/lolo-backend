import { Request, Response, NextFunction } from "express";
import ManagementActionService from "../../app/dash/services/management-action.service";
import UserLogService from "../../app/dash/services/user-log.service";
import managementActionModel from "../../db/models/management-action.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new ManagementActionService();
const serviceUserLog = new UserLogService();

const { MANAGEMENT_ACTION_TABLE } = managementActionModel;

export const getManagementActionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const managementActions = await service.findAll();
    res.json(managementActions);
  } catch (error) {
    next(error);
  }
};

export const getManagementActionByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const managementActions = await service.findAllByCHB(chb);
    res.json(managementActions);
  } catch (error) {
    next(error);
  }
};

export const getManagementActionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const managementAction = await service.findOne(id);
    res.json(managementAction);
  } catch (error) {
    next(error);
  }
};

export const createManagementActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newManagementAction = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newManagementAction.dataValues.id,
      newData: newManagementAction.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P07-01",
      entity: MANAGEMENT_ACTION_TABLE,
      entityId: Number(newManagementAction.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newManagementAction);
  } catch (error) {
    next(error);
  }
};

export const updateManagementActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldManagementAction, newManagementAction } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newManagementAction.dataValues.id,
      oldData: oldManagementAction,
      newData: newManagementAction.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P07-02",
      entity: MANAGEMENT_ACTION_TABLE,
      entityId: Number(newManagementAction.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newManagementAction);
  } catch (error) {
    next(error);
  }
};

export const deleteManagementActionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldManagementAction = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldManagementAction,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P07-03",
      entity: MANAGEMENT_ACTION_TABLE,
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

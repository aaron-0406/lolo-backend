import { Request, Response, NextFunction } from "express";
import DashIpAddressBankService from "../../app/dash/services/dash-ip-address-bank.service";
import UserLogService from "../../app/dash/services/user-log.service";
import dashIpAddressBankModel from "../../db/models/dash-ip-address-bank.model";

const service = new DashIpAddressBankService();
const serviceUserLog = new UserLogService();

const { DASH_IP_ADDRESS_BANK_TABLE } = dashIpAddressBankModel;

export const getDashIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashIpAddress = await service.findAll();
    res.json(dashIpAddress);
  } catch (error) {
    next(error);
  }
};

export const getDashIpAddressByIpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ip } = req.params;
    const dashIpAddress = await service.findByIP(ip);
    res.json(dashIpAddress);
  } catch (error) {
    next(error);
  }
};

export const getDashIpAddressByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const dashIpAddress = await service.findByID(id);
    res.json(dashIpAddress);
  } catch (error) {
    next(error);
  }
};

export const createDashIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newDashIpAddress = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-01",
      entity: DASH_IP_ADDRESS_BANK_TABLE,
      entityId: Number(newDashIpAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newDashIpAddress);
  } catch (error) {
    next(error);
  }
};

export const updateDashIpAddressStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.updateState(id, body.state);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-02",
      entity: DASH_IP_ADDRESS_BANK_TABLE,
      entityId: Number(user.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateDashIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const dashIpAddress = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-03",
      entity: DASH_IP_ADDRESS_BANK_TABLE,
      entityId: Number(dashIpAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(dashIpAddress);
  } catch (error) {
    next(error);
  }
};

export const deleteDashIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P14-04",
      entity: DASH_IP_ADDRESS_BANK_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

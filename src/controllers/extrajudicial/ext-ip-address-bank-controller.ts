import { Request, Response, NextFunction } from "express";
import ExtIpAddressBankService from "../../app/extrajudicial/services/ext-ip-address-bank.service";
import UserLogService from "../../app/dash/services/user-log.service";
import ExtIpAddressBankModel from "../../db/models/ext-ip-address-bank.model";

const service = new ExtIpAddressBankService();
const serviceUserLog = new UserLogService();

const { EXT_IP_ADDRESS_BANK_TABLE } = ExtIpAddressBankModel;

export const getIpAddressesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const ipAddress = await service.findAllByCustomerId(customerId);
    res.json(ipAddress);
  } catch (error) {
    next(error);
  }
};

export const getIpAddressByIpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ip, customerId } = req.params;
    const ipAddress = await service.findByIP(ip, customerId);
    res.json(ipAddress);
  } catch (error) {
    next(error);
  }
};

export const getIpAddressByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, customerId } = req.params;
    const ipAddress = await service.findByID(id, customerId);
    res.json(ipAddress);
  } catch (error) {
    next(error);
  }
};

export const createIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newIpAddress = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-01",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(newIpAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newIpAddress);
  } catch (error) {
    next(error);
  }
};

export const updateIpAddressStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, customerId } = req.params;
    const body = req.body;
    const ipAddress = await service.updateState(id, customerId, body.state);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-02",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(ipAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(ipAddress);
  } catch (error) {
    next(error);
  }
};

export const updateIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const ipAddress = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-03",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(ipAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(ipAddress);
  } catch (error) {
    next(error);
  }
};

export const deleteIpAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, customerId } = req.params;
    await service.delete(id, customerId);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-04",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import ExtIpAddressBankService from "../../app/extrajudicial/services/ext-ip-address-bank.service";
import UserLogService from "../../app/dash/services/user-log.service";
import ExtIpAddressBankModel from "../../db/models/ext-ip-address-bank.model";
import { generateLogSummary } from "../../utils/dash/user-log";

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

    const sumary = generateLogSummary({
      method: req.method,
      id: newIpAddress.dataValues.id,
      newData: newIpAddress.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-01",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(newIpAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
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
    const { oldExtIpAddress, newExtIpAddress } = await service.updateState(id, customerId, body.state);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtIpAddress.dataValues.id,
      oldData: oldExtIpAddress,
      newData: newExtIpAddress.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-02",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(newExtIpAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newExtIpAddress);
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
    const { oldExtIpAddress, newExtIpAddress } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtIpAddress.dataValues.id,
      oldData: oldExtIpAddress,
      newData: newExtIpAddress.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-03",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
      entityId: Number(newExtIpAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newExtIpAddress);
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
    const oldExtIpAddress = await service.delete(id, customerId);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldExtIpAddress,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P15-04",
      entity: EXT_IP_ADDRESS_BANK_TABLE,
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

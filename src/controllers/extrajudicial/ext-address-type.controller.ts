import { Request, Response, NextFunction } from "express";
import extAddressTypeervice from "../../app/extrajudicial/services/ext-address-type.service";
import extAddressTypeModel from "../../db/models/ext-address-type.model";
import UserLogService from "../../app/dash/services/user-log.service";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new extAddressTypeervice();
const serviceUserLog = new UserLogService();

const { EXT_ADDRESS_TYPE_TABLE } = extAddressTypeModel;

export const getAllAddressTypesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await service.findAll();
    res.json(address);
  } catch (error) {
    next(error);
  }
};

export const getAddressTypeByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const address = await service.findAllByChb(chb);
    res.json(address);
  } catch (error) {
    next(error);
  }
};

export const getAddressTypeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, chb } = req.params;
    const address = await service.findByID(id, chb);
    res.json(address);
  } catch (error) {
    next(error);
  }
};

export const createAddressTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newAddress = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newAddress.dataValues.id,
      newData: newAddress.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P16-01",
      entity: EXT_ADDRESS_TYPE_TABLE,
      entityId: Number(newAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};

export const updateAddressTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldAddress, newAddress } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newAddress.dataValues.id,
      oldData: oldAddress,
      newData: newAddress.dataValues,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P16-02",
      entity: EXT_ADDRESS_TYPE_TABLE,
      entityId: Number(newAddress.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newAddress);
  } catch (error) {
    next(error);
  }
};

export const deleteAddressTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, chb } = req.params;
    const oldAddress = await service.delete(id, chb);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldAddress,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P16-03",
      entity: EXT_ADDRESS_TYPE_TABLE,
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

import { Request, Response, NextFunction } from "express";
import ExtContactTypeService from "../../app/extrajudicial/services/ext-contact-type.service";
import UserLogService from "../../app/dash/services/user-log.service";
import extContactTypeModel from "../../db/models/ext-contact-type.model";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new ExtContactTypeService();
const serviceUserLog = new UserLogService();

const { EXT_CONTACT_TYPE_TABLE } = extContactTypeModel;

export const getExtContactTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const extContactTypes = await service.findAll();
    res.json(extContactTypes);
  } catch (error) {
    next(error);
  }
};

export const getExtContactTypeByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const extContactTypes = await service.findAllByCHB(chb);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P18-04",
        entity: EXT_CONTACT_TYPE_TABLE,
        entityId: Number(chb),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(extContactTypes);
  } catch (error) {
    next(error);
  }
};

export const getExtContactTypeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const extContactType = await service.findByID(id);
    res.json(extContactType);
  } catch (error) {
    next(error);
  }
};

export const createExtContactTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newExtContactType = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtContactType.dataValues.id,
      newData: newExtContactType.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P18-01",
      entity: EXT_CONTACT_TYPE_TABLE,
      entityId: Number(newExtContactType.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newExtContactType);
  } catch (error) {
    next(error);
  }
};

export const updateExtContactTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldExtContactType, newExtContactType } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newExtContactType.dataValues.id,
      oldData: oldExtContactType,
      newData: newExtContactType.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P18-02",
      entity: EXT_CONTACT_TYPE_TABLE,
      entityId: Number(newExtContactType.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newExtContactType);
  } catch (error) {
    next(error);
  }
};

export const deleteExtContactTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldExtContactType = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldExtContactType,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P18-03",
      entity: EXT_CONTACT_TYPE_TABLE,
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

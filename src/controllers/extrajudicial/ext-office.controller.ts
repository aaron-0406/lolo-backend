import { Request, Response, NextFunction } from "express";
import ExtOfficeService from "../../app/extrajudicial/services/ext-office.service";
import UserLogService from "../../app/dash/services/user-log.service";
import ExtOfficeModel from "../../db/models/ext-office.model";

const service = new ExtOfficeService();
const serviceUserLog = new UserLogService();

const { EXT_OFFICE_TABLE } = ExtOfficeModel;

export const getOfficesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const offices = await service.findAllByCustomerId(customerId);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P17-05",
      entity: EXT_OFFICE_TABLE,
      entityId: Number(customerId),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(offices);
  } catch (error) {
    next(error);
  }
};

export const getOfficesByCityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cityId } = req.params;
    const offices = await service.findAllByCityId(cityId);
    res.json(offices);
  } catch (error) {
    next(error);
  }
};

export const getOfficeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, customerId } = req.params;
    const office = await service.findByID(id, customerId);
    res.json(office);
  } catch (error) {
    next(error);
  }
};

export const createOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newOffice = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P17-01",
      entity: EXT_OFFICE_TABLE,
      entityId: Number(newOffice.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newOffice);
  } catch (error) {
    next(error);
  }
};

export const updateOfficeStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, customerId } = req.params;
    const body = req.body;
    const office = await service.updateState(id, customerId, body.state);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P17-02",
      entity: EXT_OFFICE_TABLE,
      entityId: Number(office.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(office);
  } catch (error) {
    next(error);
  }
};

export const updateOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const office = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P17-03",
      entity: EXT_OFFICE_TABLE,
      entityId: Number(office.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(office);
  } catch (error) {
    next(error);
  }
};

export const deleteOfficeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, customerId } = req.params;
    await service.delete(id, customerId);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P17-04",
      entity: EXT_OFFICE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

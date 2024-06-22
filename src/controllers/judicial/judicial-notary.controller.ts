import { Request, Response, NextFunction } from "express";
import JudicialNotaryService from "../../app/judicial/services/judicial-notary.service";
import judicialNotaryModel from "../../db/models/judicial-notary.model";
import UserLogService from "../../app/dash/services/user-log.service";

const service = new JudicialNotaryService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_NOTARY_TABLE } = judicialNotaryModel;

export const findNotaryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const notary = await service.findByID(id);
    res.json(notary);
  } catch (error) {
    next(error);
  }
}

export const findAllNotariesByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const notaries = await service.findAllByCHB(parseInt(chb));
    res.json(notaries);
  } catch (error) {
    next(error);
  }
}

export const createNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newNotary = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P41-01",
      entity: JUDICIAL_NOTARY_TABLE,
      entityId: Number(newNotary.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(newNotary);
  } catch (error) {
    next(error);
  }
}

export const updateNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const notary = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P41-02",
      entity: JUDICIAL_NOTARY_TABLE,
      entityId: Number(notary.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(notary);
  } catch (error) {
    next(error);
  }
}

export const deletedNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const notary = await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P41-03",
      entity: JUDICIAL_NOTARY_TABLE,
      entityId: Number(notary.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(notary);
  } catch (error) {
    next(error);
  }
}
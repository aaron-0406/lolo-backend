import { Request, Response, NextFunction } from "express";
import JudicialNotaryService from "../../app/judicial/services/judicial-notary.service";
import judicialNotaryModel from "../../db/models/judicial-notary.model";
import UserLogService from "../../app/dash/services/user-log.service";
import { generateLogSummary } from "../../utils/dash/user-log";

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
};

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
};

export const createNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newNotary = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newNotary.dataValues.id,
      newData: newNotary.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P41-01",
      entity: JUDICIAL_NOTARY_TABLE,
      entityId: Number(newNotary.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newNotary);
  } catch (error) {
    next(error);
  }
};

export const updateNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialNotary, newJudicialNotary } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialNotary.dataValues.id,
      newData: newJudicialNotary.dataValues,
      oldData: oldJudicialNotary,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P41-02",
      entity: JUDICIAL_NOTARY_TABLE,
      entityId: Number(newJudicialNotary.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newJudicialNotary);

  } catch (error) {
    next(error);
  }
};

export const deletedNotaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldNotary = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: oldNotary.id,
      oldData: oldNotary,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P41-03",
      entity: JUDICIAL_NOTARY_TABLE,
      entityId: Number(oldNotary.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json({ id });
  } catch (error) {
    next(error);
  }
};

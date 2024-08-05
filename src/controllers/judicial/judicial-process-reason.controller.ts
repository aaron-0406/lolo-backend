import { Request, Response, NextFunction } from "express";
import judicialProcessReasonService from "../../app/judicial/services/judicial-process-reason.service";
import judicialProcessReasonModel from "../../db/models/judicial-process-reason.model";
import UserLogService from "../../app/dash/services/user-log.service";
import { generateLogSummary } from "../../utils/dash/user-log";

const { JUDICIAL_PROCESS_REASON_TABLE } = judicialProcessReasonModel
const service = new judicialProcessReasonService();
const serviceUserLog = new UserLogService();

export const getJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialProcessReason = await service.findAll();
    res.json(judicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProcessReasonByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialJudicialProcessReason = await service.findAllByCHB(Number(chb));
    res.json(judicialJudicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProcessReasonByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialProcessReason = await service.findByID(Number(id));
    res.json(judicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const createJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialProcessReason = await service.create(body);
    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialProcessReason.dataValues.id,
      newData: newJudicialProcessReason.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P27-01",
      entity: JUDICIAL_PROCESS_REASON_TABLE,
      entityId: Number(newJudicialProcessReason.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json(newJudicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialProcessReason, newJudicialProcessReason } = await service.update(Number(id), body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialProcessReason.dataValues.id,
      oldData: oldJudicialProcessReason,
      newData: newJudicialProcessReason.dataValues,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P27-02",
      entity: JUDICIAL_PROCESS_REASON_TABLE,
      entityId: Number(newJudicialProcessReason.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });


    res.json(newJudicialProcessReason);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialProcessReasonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldJudicialProcessReason = await service.delete(Number(id));

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldJudicialProcessReason,
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P27-03",
      entity: JUDICIAL_PROCESS_REASON_TABLE,
      entityId: Number(oldJudicialProcessReason.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

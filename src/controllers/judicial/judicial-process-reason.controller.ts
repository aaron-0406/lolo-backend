import { Request, Response, NextFunction } from "express";
import judicialProcessReasonService from "../../app/judicial/services/judicial-process-reason.service";
import judicialProcessReasonModel from "../../db/models/judicial-process-reason.model";
import UserLogService from "../../app/dash/services/user-log.service";

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

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P27-01",
      entity: JUDICIAL_PROCESS_REASON_TABLE,
      entityId: Number(newJudicialProcessReason.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
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
    const judicialProcessReason = await service.update(Number(id), body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P27-02",
      entity: JUDICIAL_PROCESS_REASON_TABLE,
      entityId: Number(judicialProcessReason.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });


    res.json(judicialProcessReason);
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
    const judicialProcessReason = await service.delete(Number(id));

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P27-03",
      entity: JUDICIAL_PROCESS_REASON_TABLE,
      entityId: Number(judicialProcessReason.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

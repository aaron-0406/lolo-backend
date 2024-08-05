import { Request, Response, NextFunction } from "express";
import JudicialCourtService from "../../app/judicial/services/judicial-court.service";
import judicialCourtModel from "../../db/models/judicial-court.model";
import UserLogService from "../../app/dash/services/user-log.service";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialCourtService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_COURT_TABLE } = judicialCourtModel;

export const getJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialCourts = await service.findAll();
    res.json(judicialCourts);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCourtByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialCourts = await service.findAllByCHB(Number(chb));
    res.json(judicialCourts);
  } catch (error) {
    next(error);
  }
};

export const getJudicialCourtByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialCourt = await service.findByID(id);
    res.json(judicialCourt);
  } catch (error) {
    next(error);
  }
};

export const createJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialCourt = await service.create(body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialCourt.dataValues.id,
      newData: newJudicialCourt.dataValues,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P20-01",
        entity: JUDICIAL_COURT_TABLE,
        entityId: Number(newJudicialCourt.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });
    res.status(201).json(newJudicialCourt);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { oldJudicialCourt, newJudicialCourt } = await service.update(id, body);

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialCourt.dataValues.id,
      oldData: oldJudicialCourt,
      newData: newJudicialCourt.dataValues,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P20-02",
        entity: JUDICIAL_COURT_TABLE,
        entityId: Number(newJudicialCourt.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
        methodSumary: sumary,
      });

    res.json(newJudicialCourt);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialCourtController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const oldJudicialCourt = await service.delete(id);
    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldJudicialCourt,
    });

      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P20-03",
        entity: JUDICIAL_COURT_TABLE,
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

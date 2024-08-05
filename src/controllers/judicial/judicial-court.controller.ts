import { Request, Response, NextFunction } from "express";
import JudicialCourtService from "../../app/judicial/services/judicial-court.service";
import judicialCourtModel from "../../db/models/judicial-court.model";
import UserLogService from "../../app/dash/services/user-log.service";

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

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P20-01",
        entity: JUDICIAL_COURT_TABLE,
        entityId: Number(newJudicialCourt.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

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
    const judicialCourt = await service.update(id, body);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P20-02",
        entity: JUDICIAL_COURT_TABLE,
        entityId: Number(judicialCourt.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }


    res.json(judicialCourt);
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
    await service.delete(id);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P20-03",
        entity: JUDICIAL_COURT_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }


    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

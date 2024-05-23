import { Request, Response, NextFunction } from "express";
import JudicialProceduralWayService from "../../app/judicial/services/judicial-procedural-way.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialProceduralWayModel from "../../db/models/judicial-procedural-way.model";

const service = new JudicialProceduralWayService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_PROCEDURAL_WAY_TABLE } = judicialProceduralWayModel;


export const getJudicialProceduralWayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialProceduralWays = await service.findAll();
    res.json(judicialProceduralWays);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProceduralWayByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialProceduralWays = await service.findAllByCHB(Number(chb));
    res.json(judicialProceduralWays);
  } catch (error) {
    next(error);
  }
};

export const getJudicialProceduralWayByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialProceduralWay = await service.findByID(id);
    res.json(judicialProceduralWay);
  } catch (error) {
    next(error);
  }
};

export const createJudicialProceduralWayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialProceduralWay = await service.create(body);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P22-01",
        entity: JUDICIAL_PROCEDURAL_WAY_TABLE,
        entityId: Number(newJudicialProceduralWay.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.status(201).json(newJudicialProceduralWay);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialProceduralWayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialProceduralWay = await service.update(id, body);

    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P22-02",
        entity: JUDICIAL_PROCEDURAL_WAY_TABLE,
        entityId: Number(judicialProceduralWay.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialProceduralWay);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialProceduralWayController = async (
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
        codeAction: "P22-03",
        entity: JUDICIAL_PROCEDURAL_WAY_TABLE,
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

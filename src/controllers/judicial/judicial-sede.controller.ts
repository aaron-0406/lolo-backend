import { Request, Response, NextFunction } from "express";
import JudicialSedeService from "../../app/judicial/services/judicial-sede.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialSedeModel from "../../db/models/judicial-sede.model";

const service = new JudicialSedeService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_SEDE_TABLE } = judicialSedeModel;

export const getJudicialSedeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialSedes = await service.findAll();
    res.json(judicialSedes);
  } catch (error) {
    next(error);
  }
};

export const getJudicialSedeByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialSedes = await service.findAllByCHB(chb);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P23-04",
        entity: JUDICIAL_SEDE_TABLE,
        entityId: Number(chb),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialSedes);
  } catch (error) {
    next(error);
  }
};

export const getJudicialSedeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialSede = await service.findByID(id);
    res.json(judicialSede);
  } catch (error) {
    next(error);
  }
};

export const createJudicialSedeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialSede = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P23-01",
      entity: JUDICIAL_SEDE_TABLE,
      entityId: Number(newJudicialSede.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newJudicialSede);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialSedeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialSede = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P23-02",
      entity: JUDICIAL_SEDE_TABLE,
      entityId: Number(judicialSede.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(judicialSede);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialSedeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P23-03",
      entity: JUDICIAL_SEDE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

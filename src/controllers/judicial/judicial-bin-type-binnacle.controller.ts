import { Request, Response, NextFunction } from "express";
import JudicialBinTypeBinnacleService from "../../app/judicial/services/judicial-bin-type-binnacle.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialBinTypeBinnacleModel from "../../db/models/judicial-bin-type-binnacle.model";

const service = new JudicialBinTypeBinnacleService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicialBinTypeBinnacleModel;

export const getJudicialBinTypeBinnacleByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialBinTypeBinnacles = await service.findAllByCHB(Number(chb));
    res.json(judicialBinTypeBinnacles);
  } catch (error) {
    next(error);
  }
};

export const getJudicialBinTypeBinnacleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinTypeBinnacle = await service.findByID(id);
    res.json(judicialBinTypeBinnacle);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinTypeBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialBinTypeBinnacle = await service.create(body);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P25-01",
        entity: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
        entityId: Number(newJudicialBinTypeBinnacle.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.status(201).json(newJudicialBinTypeBinnacle);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinTypeBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialBinTypeBinnacle = await service.update(id, body);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P25-02",
        entity: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
        entityId: Number(judicialBinTypeBinnacle.dataValues.id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialBinTypeBinnacle);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinTypeBinnacleController = async (
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
        codeAction: "P25-03",
        entity: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
        entityId: Number(id),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};

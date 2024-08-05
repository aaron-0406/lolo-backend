import { Request, Response, NextFunction } from "express";
import JudicialBinnacleService from "../../app/judicial/services/judicial-binnacle.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialBinnacleModel from "../../db/models/judicial-binnacle.model";

const service = new JudicialBinnacleService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;

export const getJudicialBinnacleByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileCase } = req.params;
    const judicialBinnacles = await service.findAllByCHBAndFileCase(
      Number(fileCase),
      req.query
    );
    res.json(judicialBinnacles);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getJudicialBinnacleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialBinnacle = await service.findByID(id);
    res.json(judicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const createJudicialBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, files, params } = req;
    const newJudicialBinnacle = await service.create(body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-01",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(newJudicialBinnacle.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });
    res.status(201).json(newJudicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body, files, params } = req;
    const judicialBinnacle = await service.update(id, body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-02",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(judicialBinnacle.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });
    res.json(judicialBinnacle);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialBinnacleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01-03",
      entity: JUDICIAL_BINNACLE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });
    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};

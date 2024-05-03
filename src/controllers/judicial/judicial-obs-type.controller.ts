import { Request, Response, NextFunction } from "express";
import JudicialObsTypeService from "../../app/judicial/services/judicial-obs-type.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialObsTypeModel from "../../db/models/judicial-obs-type.model";

const service = new JudicialObsTypeService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_OBS_TYPE_TABLE } = judicialObsTypeModel;

export const getJudicialObsTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const judicialObsTypes = await service.findAll();
    res.json(judicialObsTypes);
  } catch (error) {
    next(error);
  }
};

export const getJudicialObsTypeByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const judicialObsTypes = await service.findAllByCHB(chb);
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P23-04",
        entity: JUDICIAL_OBS_TYPE_TABLE,
        entityId: Number(chb),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialObsTypes);
  } catch (error) {
    next(error);
  }
};

export const getJudicialObsTypeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const judicialObsType = await service.findByID(id);
    res.json(judicialObsType);
  } catch (error) {
    next(error);
  }
};

export const createJudicialObsTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialObsType = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P23-01",
      entity: JUDICIAL_OBS_TYPE_TABLE,
      entityId: Number(newJudicialObsType.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newJudicialObsType);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialObsTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const judicialObsType = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P23-02",
      entity: JUDICIAL_OBS_TYPE_TABLE,
      entityId: Number(judicialObsType.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(judicialObsType);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialObsTypeController = async (
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
      entity: JUDICIAL_OBS_TYPE_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

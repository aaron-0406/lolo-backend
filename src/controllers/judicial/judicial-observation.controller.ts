import { Request, Response, NextFunction } from "express";
import JudicialObservationService from "../../app/judicial/services/judicial-observation.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialObservationModel from "../../db/models/judicial-observation.model";

const service = new JudicialObservationService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_OBSERVATION_TABLE } = judicialObservationModel;

export const getJudicialObservationController = async (
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

export const getJudicialObservationByCHBAndJudicialCaseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb, judicialCaseId } = req.params;
    const judicialObsTypes = await service.findAllByCHBAndJudicialCase(
      chb,
      judicialCaseId
    );
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P13-01-04",
        entity: JUDICIAL_OBSERVATION_TABLE,
        entityId: Number(judicialCaseId),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialObsTypes);
  } catch (error) {
    next(error);
  }
};

export const getJudicialObservationByIdController = async (
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

export const createJudicialObservationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newJudicialObsType = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-01",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(newJudicialObsType.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newJudicialObsType);
  } catch (error) {
    next(error);
  }
};

export const updateJudicialObservationController = async (
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
      codeAction: "P13-01-02",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(judicialObsType.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(judicialObsType);
  } catch (error) {
    next(error);
  }
};

export const deleteJudicialObservationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-03",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

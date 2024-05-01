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
    const judicialObservations = await service.findAll();
    res.json(judicialObservations);
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
    const judicialObservations = await service.findAllByCHBAndJudicialCase(
      chb,
      judicialCaseId
    );
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P13-01-02-04",
        entity: JUDICIAL_OBSERVATION_TABLE,
        entityId: Number(judicialCaseId),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialObservations);
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
    const judicialObservation = await service.findByID(id);
    res.json(judicialObservation);
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
    const { JudicialObservation, JudicialObsFile } = req.body;
    const newJudicialObservation = await service.create(JudicialObservation);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-02-01",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(newJudicialObservation.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.status(201).json(newJudicialObservation);
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
    const judicialObservation = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-02-02",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(judicialObservation.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(judicialObservation);
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
      codeAction: "P13-01-02-03",
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

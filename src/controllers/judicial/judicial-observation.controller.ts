import { Request, Response, NextFunction } from "express";
import JudicialObservationService from "../../app/judicial/services/judicial-observation.service";
import judicialObservationTypeModel from "../../db/models/judicial-observation.model";
import UserLogService from "../../app/dash/services/user-log.service";
import { generateLogSummary } from "../../utils/dash/user-log";

const service = new JudicialObservationService();
const serviceUserLog = new UserLogService();
const { JUDICIAL_OBSERVATION_TABLE } = judicialObservationTypeModel;

export const getJudicialObservationByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileCase } = req.params;
    const judicialObservations = await service.findAllByCHBAndFileCase(
      Number(fileCase)
    );
    const { visible } = req.query;

    if (visible === "true") {
      await serviceUserLog.create({
        customerUserId: Number(req.user?.id),
        codeAction: "P13-01-02-04",
        entity: JUDICIAL_OBSERVATION_TABLE,
        entityId: Number(fileCase),
        ip: req.clientIp ?? "",
        customerId: Number(req.user?.customerId),
      });
    }

    res.json(judicialObservations);
  } catch (error) {
    console.log(error);
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
    const { body, files, params } = req;
    const newJudicialObservation = await service.create(body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialObservation.dataValues.id,
      newData: newJudicialObservation.dataValues,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-02-01",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(newJudicialObservation.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
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
    const { body, files, params } = req;
    const { oldJudicialObservation, newJudicialObservation } = await service.update(id, body, files as [], {
      code: params.code,
      idCustomer: Number(params.idCustomer),
    });

    const sumary = generateLogSummary({
      method: req.method,
      id: newJudicialObservation.dataValues.id,
      oldData: oldJudicialObservation,
      newData: newJudicialObservation.dataValues,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-02-02",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(newJudicialObservation.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.json(newJudicialObservation);
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
    const oldJudicialObservation = await service.delete(id);

    const sumary = generateLogSummary({
      method: req.method,
      id: id,
      oldData: oldJudicialObservation,
    })

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P13-01-02-03",
      entity: JUDICIAL_OBSERVATION_TABLE,
      entityId: Number(id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
      methodSumary: sumary,
    });

    res.status(201).json({ id: Number(id) });
  } catch (error) {
    next(error);
  }
};

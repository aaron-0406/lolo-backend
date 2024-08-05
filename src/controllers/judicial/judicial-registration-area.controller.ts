import { Request, Response, NextFunction } from "express";
import JudicialRegistrationAreaService from "../../app/judicial/services/judicial-registration-area.service";
import UserLogService from "../../app/dash/services/user-log.service";
import judicialRegistrationAreaModel from "../../db/models/judicial-registration-area.model";

const service = new JudicialRegistrationAreaService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicialRegistrationAreaModel;

export const findRegistrationAreaByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const registrationArea = await service.findByID(id);
    res.json(registrationArea);
  } catch (error) {
    next(error);
  }
};

export const findAllRegistrationAreasByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const registrationAreas = await service.findAllByCHB(parseInt(chb));
    res.json(registrationAreas);
  } catch (error) {
    next(error);
  }
};

export const createRegistrationAreaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newRegistrationArea = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P39-01",
      entity: JUDICIAL_REGISTRATION_AREA_TABLE,
      entityId: Number(newRegistrationArea.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(newRegistrationArea);
  } catch (error) {
    next(error);
  }
};

export const updateRegistrationAreaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const registrationArea = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P39-02",
      entity: JUDICIAL_REGISTRATION_AREA_TABLE,
      entityId: Number(registrationArea.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(registrationArea);
  } catch (error) {
    next(error);
  }
};

export const deletedRegistrationAreaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const registrationArea = await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P39-03",
      entity: JUDICIAL_REGISTRATION_AREA_TABLE,
      entityId: Number(registrationArea.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(registrationArea);
  } catch (error) {
    next(error);
  }
};

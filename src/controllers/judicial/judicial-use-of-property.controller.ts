import { Request, Response, NextFunction } from "express";
import judicialUseOfPropertyModel from "../../db/models/judicial-use-of-property.model";
import JudicialUseOfPropertyService from "../../app/judicial/services/judicial-use-of-property.service";
import UserLogService from "../../app/dash/services/user-log.service";

const service = new JudicialUseOfPropertyService();
const serviceUserLog = new UserLogService();

const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicialUseOfPropertyModel;

export const findUseOfPropertyByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const useOfProperty = await service.findByID(id);
    res.json(useOfProperty);
  } catch (error) {
    next(error);
  }
};

export const findAllUseOfPropertiesByCHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chb } = req.params;
    const useOfProperties = await service.findAllByCHB(parseInt(chb));
    res.json(useOfProperties);
  } catch (error) {
    next(error);
  }
};

export const createUseOfPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newUseOfProperty = await service.create(body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P38-01",
      entity: JUDICIAL_USE_OF_PROPERTY_TABLE,
      entityId: Number(newUseOfProperty.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(newUseOfProperty);
  } catch (error) {
    next(error);
  }
};

export const updateUseOfPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const useOfProperty = await service.update(id, body);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P38-02",
      entity: JUDICIAL_USE_OF_PROPERTY_TABLE,
      entityId: Number(useOfProperty.dataValues.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(useOfProperty);
  } catch (error) {
    next(error);
  }
};

export const deletedUseOfPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const useOfProperty = await service.delete(id);

    await serviceUserLog.create({
      customerUserId: Number(req.user?.id),
      codeAction: "P38-03",
      entity: JUDICIAL_USE_OF_PROPERTY_TABLE,
      entityId: Number(useOfProperty.id),
      ip: req.clientIp ?? "",
      customerId: Number(req.user?.customerId),
    });

    res.json(useOfProperty);
  } catch (error) {
    next(error);
  }
};
